import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
  ) {}
  async createUser(user: CreateUserDTO) {
    return await this.usersRepository.createUser(user);
  }
  async findUser(id: number) {
    return await this.usersRepository.findUser(id);
  }
  async updateUser(id: number, updatedUser: UpdateUserDTO) {
    const user = await this.usersRepository.updateUser(id, updatedUser);
    if (!user) {
      throw new NotFoundException(`Song with ID ${id} not found`);
    }
  }
  async deleteUser(id: number) {
    const result = await this.usersRepository.deleteUser(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Song with ID ${id} not found`);
    }
  }
}
