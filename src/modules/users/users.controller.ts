import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Param,
  ParseIntPipe,
  HttpStatus,
  Delete,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDTO } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  // Injecting the service into the controller

  constructor(private readonly userService: UsersService) {}
  @Get()
  getAllUsers() {
    // return an array of users
  }
  @Post()
  createUser(@Body() user: CreateUserDTO) {
    const createdUser = this.userService.createUser(user);
    return createdUser;
  }
  @Get(':id')
  async getUser(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    const user = await this.userService.findUser(id);
    return user;
  }
  @Put(':id')
  async updateUser(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body()
    user: UpdateUserDTO,
  ) {
    await this.userService.updateUser(id, user);
    return user;
  }
  @Delete(':id')
  async deleteUser(@Param('id', new ParseIntPipe()) id: number) {
    await this.userService.deleteUser(id);
    return id;
  }
}
