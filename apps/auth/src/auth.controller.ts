import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RegistrationDto, UpdateUserDto } from '@app/common/dtos';
import { LoginDto } from '@app/common/dtos/auth/login.dto';
import { Command } from '@app/common/enums';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: Command.REGISTRATION })
  async registration(@Payload() registrationDto: RegistrationDto) {
    return this.authService.registration(registrationDto);
  }

  @MessagePattern({ cmd: Command.LOGIN })
  async login(@Payload() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @MessagePattern({ cmd: Command.UPDATE_USER })
  async updateUser(
    @Payload() data: { id: number; updateUserDto: UpdateUserDto },
  ) {
    return this.authService.updateUser(data.id, data.updateUserDto);
  }
}
