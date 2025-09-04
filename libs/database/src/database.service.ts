// libs/database/src/database.service.ts

import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    // This is where you'd connect to the database.
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    // Ensures your app gracefully shuts down before closing the DB connection.
    process.on('beforeExit', async () => {
      await app.close();
    });
  }
}
