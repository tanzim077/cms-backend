import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DatabaseService } from '@app/database';

@Injectable()
export class AuthCleanupService {
  private readonly logger = new Logger(AuthCleanupService.name);

  constructor(private readonly databaseService: DatabaseService) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  async handleCron() {
    this.logger.log('Running expired tokens cleanup job...');
    const now = new Date();

    try {
      const { count } = await this.databaseService.auth.deleteMany({
        where: {
          expiresAt: {
            lte: now, // Delete tokens where expiresAt is less than or equal to the current time
          },
        },
      });
      if (count > 0) {
        this.logger.log(`Successfully cleaned up ${count} expired tokens.`);
      }
    } catch (error) {
      this.logger.error('Error during token cleanup job:', error.stack);
    }
  }
}
