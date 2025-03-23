import { Injectable } from '@nestjs/common';
import User from 'src/core/database/entities/users/user.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
  async createUser(user: CreateUserDTO) {
    return await this.save(user);
  }
  async findUser(id: number) {
    return await this.findOne({ where: { id } });
  }

  async updateUser(id: number, updatedUser: UpdateUserDTO) {
    await this.update(id, updatedUser);
    return await this.findOne({ where: { id } });
  }
  async deleteUser(id: number) {
    return await this.delete(id);
  }
}
