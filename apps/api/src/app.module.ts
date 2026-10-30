import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ChildrenModule } from './modules/children/children.module';
import { MilestonesModule } from './modules/milestones/milestones.module';
import { DocumentsModule } from './modules/documents/documents.module';
import { CaseBaselineModule } from './modules/case-baseline/case-baseline.module';
import { DoctorMatchModule } from './modules/doctor-match/doctor-match.module';
import { AiChatModule } from './modules/ai-chat/ai-chat.module';
import { SharingModule } from './modules/sharing/sharing.module';
import { DoctorsModule } from './modules/doctors/doctors.module';
import { SubscriptionsModule } from './modules/subscriptions/subscriptions.module';
import { CaseUpdateModule } from './modules/case-update/case-update.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env', '../../.env'],
    }),
    PrismaModule,
    NotificationsModule,
    AuthModule,
    UsersModule,
    ChildrenModule,
    MilestonesModule,
    DocumentsModule,
    CaseBaselineModule,
    DoctorMatchModule,
    AiChatModule,
    SharingModule,
    DoctorsModule,
    SubscriptionsModule,
    CaseUpdateModule,
    AdminModule,
  ],
})
export class AppModule {}
