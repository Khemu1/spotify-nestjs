import { AppDataSource } from '../data-source';
import { seedUsers } from './user.seed';
import { seedPlaylists } from './playlist.seed';
import { seedSongs } from './song.seed';

AppDataSource.initialize()
  .then(async () => {
    console.log('🌱 Running seeds...');

    const users = await seedUsers(AppDataSource);
    const playlists = await seedPlaylists(AppDataSource, users);
    await seedSongs(AppDataSource, playlists);

    console.log('✅ Seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  });
