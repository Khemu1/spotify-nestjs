import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';
import User from '../entities/users/user.entity';

export async function seedUsers(dataSource: DataSource) {
  const userRepo = dataSource.getRepository(User);
  const users = [];

  for (let i = 0; i < 5; i++) {
    const user = userRepo.create({
      username: faker.internet.username(),
      password: faker.internet.password(),
    });

    await userRepo.save(user);
  }

  console.log('✅ Users seeded successfully!');
  return users;
}
