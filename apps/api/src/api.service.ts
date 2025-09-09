import { Inject, Injectable } from '@nestjs/common';
import { LoginDto, RegistrationDto, UpdateUserDto } from '@app/common/dtos';
import { ClientProxy } from '@nestjs/microservices';
import { Command } from '@app/common/enums';

@Injectable()
export class ApiService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
    @Inject('USERS_SERVICE') private readonly usersService: ClientProxy,
  ) {}

  registration(registrationData: RegistrationDto) {
    return this.authService.send(
      { cmd: Command.REGISTRATION },
      registrationData,
    );
  }

  login(loginData: LoginDto) {
    return this.authService.send({ cmd: Command.LOGIN }, loginData);
  }

  updateProfile(id: number, updateUserDto: UpdateUserDto) {
    return this.usersService.send(
      { cmd: Command.UPDATE_USER },
      { id, updateUserDto },
    );
  }
}
