import { DataSource } from 'typeorm';
import Playlist from '../entities/playlists/playlist.entity';
import { faker } from '@faker-js/faker';
import User from '../entities/users/user.entity';

export async function seedPlaylists(dataSource: DataSource, users: User[]) {
  const playlistRepo = dataSource.getRepository(Playlist);
  const playlists = [];

  for (let i = 0; i < 10; i++) {
    const playlist = playlistRepo.create({
      name: faker.music.genre() + ' Mix',
      user: users[Math.floor(Math.random() * users.length)],
    });

    await playlistRepo.save(playlist);
  }

  console.log('✅ Playlists seeded successfully!');
  return playlists;
}
