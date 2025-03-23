import { DataSource } from 'typeorm';
import Song from '../entities/songs/song.entity';
import { faker } from '@faker-js/faker';
import Playlist from '../entities/playlists/playlist.entity';

export async function seedSongs(dataSource: DataSource, playlists: Playlist[]) {
  const songRepo = dataSource.getRepository(Song);

  for (let i = 0; i < 20; i++) {
    const song = songRepo.create({
      title: faker.music.songName(),
      artist: faker.person.fullName(),
      duration: new Date(faker.number.int({ min: 120, max: 300 }) * 1000),
      releaseDate: faker.date.past(),
      playlist: playlists[Math.floor(Math.random() * playlists.length)],
    });

    await songRepo.save(song);
  }

  console.log('✅ Songs seeded successfully!');
}
