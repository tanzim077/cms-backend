import { Injectable } from '@nestjs/common';
import { RegistrationDto } from '@app/common/dtos';
import { DatabaseService } from '@app/database';

@Injectable()
export class ApiService {
  constructor(private readonly databaseService: DatabaseService) {}

  async registration(registrationData: RegistrationDto) {
    return this.databaseService.user.create({
      data: registrationData,
    });
  }
}
