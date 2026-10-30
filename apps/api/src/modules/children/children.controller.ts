import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { ChildrenService } from './children.service';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserRole } from '@prisma/client';

@ApiTags('Children')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('children')
export class ChildrenController {
  constructor(private childrenService: ChildrenService) {}

  @Post()
  @Roles(UserRole.parent, UserRole.super_admin)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a child with initial clinical profile' })
  @ApiResponse({ status: 201, description: 'Child profile created' })
  async create(
    @CurrentUser('id') parentId: string,
    @Body() dto: CreateChildDto,
  ) {
    return this.childrenService.create(parentId, dto);
  }

  @Get()
  @Roles(UserRole.parent, UserRole.super_admin)
  @ApiOperation({ summary: 'Get all children for current parent' })
  async findAll(@CurrentUser('id') parentId: string) {
    return this.childrenService.findAllByParent(parentId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get full child profile with clinical data' })
  async findOne(
    @Param('id') childId: string,
    @CurrentUser('id') currentUserId: string,
    @CurrentUser('role') currentUserRole: string,
  ) {
    return this.childrenService.findOne(childId, currentUserId, currentUserRole);
  }

  @Patch(':id')
  @Roles(UserRole.parent)
  @ApiOperation({ summary: 'Update child profile' })
  async update(
    @Param('id') childId: string,
    @CurrentUser('id') parentId: string,
    @Body() dto: UpdateChildDto,
  ) {
    return this.childrenService.update(childId, parentId, dto);
  }

  @Delete(':id')
  @Roles(UserRole.parent, UserRole.super_admin)
  @ApiOperation({ summary: 'Delete child profile (GDPR Right to be Forgotten)' })
  async delete(
    @Param('id') childId: string,
    @CurrentUser('id') parentId: string,
  ) {
    return this.childrenService.delete(childId, parentId);
  }
}
