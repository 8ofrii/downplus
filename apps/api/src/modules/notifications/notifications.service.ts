import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  async sendPushNotification(fcmToken: string, title: string, body: string, data?: Record<string, string>) {
    this.logger.log(`[FCM Notification] To: ${fcmToken} | Title: "${title}" | Body: "${body}" | Data: ${JSON.stringify(data || {})}`);
    return { success: true, messageId: `msg_${Date.now()}` };
  }

  async sendSmsNotification(phoneNumber: string, message: string) {
    this.logger.log(`[SMS Gateway] To: ${phoneNumber} | Message: "${message}"`);
    return { success: true };
  }
}
