import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  NotAcceptableException,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuardAdmin } from '../autenticacao/autenticacao.admin.guard';
import { AuthGuard } from '../autenticacao/autenticacao.member.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuardAdmin)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuardAdmin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    if (isNaN(Number(id))) {
      throw new NotAcceptableException('Opa.', 'ID inválido.');
    }
    return this.userService.findOne(Number(id));
  }

  @UseGuards(AuthGuardAdmin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @UseGuards(AuthGuardAdmin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    if (isNaN(Number(id))) {
      throw new NotAcceptableException('Opa.', 'ID inválido.');
    }
    return this.userService.remove(Number(id));
  }

  @UseGuards(AuthGuard)
  @Patch('account/update')
  getMe(@Req() req: Request, @Body() corpo) {
    return this.userService.updateMe(req, corpo);
  }
}
