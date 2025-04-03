import { Module } from '@nestjs/common';
import { CharactersModule } from './app/characters/characters.module';
import { TypeOrmConfigModule } from './config/typeOrm.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CharactersModule,
    TypeOrmConfigModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
