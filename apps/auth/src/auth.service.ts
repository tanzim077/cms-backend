import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@app/database';

@Injectable()
export class AuthService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getHello() {
    const user = await this.databaseService.user.create({
      data: {
        email: 'tanzim@gmail.com',
        password: '1234',
      },
    });
    return user;
  }

  async register(createUserDto: any) {
    const user = await this.databaseService.user.create({
      data: createUserDto,
    });
    return user;
  }
}
