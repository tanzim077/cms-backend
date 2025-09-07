import { Inject, Injectable } from '@nestjs/common';
import { LoginDto, RegistrationDto } from '@app/common/dtos';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ApiService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
  ) {}

  async registration(registrationData: RegistrationDto) {
    return this.authService.send({ cmd: 'registration' }, registrationData);
  }

  async login(loginData: LoginDto) {
    return this.authService.send({ cmd: 'login' }, loginData);
  }
}
