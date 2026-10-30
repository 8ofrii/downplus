import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserRole } from '@prisma/client';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  // In-memory OTP storage for development (use Redis in production)
  private readonly otpStore = new Map<string, { code: string; expiresAt: Date }>();

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: dto.email }, { phoneNumber: dto.phoneNumber }],
      },
    });

    if (existing) {
      if (existing.email === dto.email) {
        throw new ConflictException({
          code: 'EMAIL_ALREADY_EXISTS',
          message: 'An account with this email address already exists.',
        });
      }
      throw new ConflictException({
        code: 'PHONE_ALREADY_EXISTS',
        message: 'An account with this phone number already exists.',
      });
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(dto.password, salt);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        phoneNumber: dto.phoneNumber,
        passwordHash,
        role: dto.role || UserRole.parent,
        subscription: {
          create: {
            tier: 'free',
            status: 'active',
          },
        },
      },
      select: {
        id: true,
        email: true,
        phoneNumber: true,
        role: true,
        isVerified: true,
        createdAt: true,
      },
    });

    const tokens = await this.generateTokens(user.id, user.email, user.role);

    return {
      user,
      ...tokens,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException({
        code: 'INVALID_CREDENTIALS',
        message: 'Invalid email or password combination.',
      });
    }

    const isMatch = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException({
        code: 'INVALID_CREDENTIALS',
        message: 'Invalid email or password combination.',
      });
    }

    const tokens = await this.generateTokens(user.id, user.email, user.role);

    return {
      user: {
        id: user.id,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        isVerified: user.isVerified,
      },
      ...tokens,
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET') || 'default-refresh-secret',
      });

      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return this.generateTokens(user.id, user.email, user.role);
    } catch {
      throw new UnauthorizedException({
        code: 'INVALID_REFRESH_TOKEN',
        message: 'Refresh token is invalid or expired. Please log in again.',
      });
    }
  }

  async sendOtp(phoneNumber: string) {
    // Generate 6-digit random code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    this.otpStore.set(phoneNumber, { code, expiresAt });
    this.logger.log(`[SMS OTP SIMULATION] OTP for ${phoneNumber}: ${code}`);

    return {
      sent: true,
      expires_in_seconds: 300,
      message: 'Verification code sent successfully via SMS.',
    };
  }

  async verifyOtp(phoneNumber: string, code: string, userId?: string) {
    const stored = this.otpStore.get(phoneNumber);

    if (!stored) {
      throw new BadRequestException({
        code: 'OTP_EXPIRED_OR_NOT_FOUND',
        message: 'No OTP request found for this phone number or it has expired.',
      });
    }

    if (new Date() > stored.expiresAt) {
      this.otpStore.delete(phoneNumber);
      throw new BadRequestException({
        code: 'OTP_EXPIRED',
        message: 'Verification code has expired. Please request a new one.',
      });
    }

    if (stored.code !== code) {
      throw new BadRequestException({
        code: 'INVALID_OTP_CODE',
        message: 'Incorrect verification code. Please check and try again.',
      });
    }

    // Success - clean up
    this.otpStore.delete(phoneNumber);

    if (userId) {
      await this.prisma.user.update({
        where: { id: userId },
        data: { isVerified: true },
      });
    }

    return {
      verified: true,
      message: 'Phone number verified successfully.',
    };
  }

  private async generateTokens(userId: string, email: string, role: string) {
    const payload = { sub: userId, email, role };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET') || 'default-access-secret',
        expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRY') || '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET') || 'default-refresh-secret',
        expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRY') || '7d',
      }),
    ]);

    return {
      accessToken,
      refreshToken,
      expiresIn: 900, // 15 mins in seconds
    };
  }
}
