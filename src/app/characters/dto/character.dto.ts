import { Expose, Transform } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
config();

const configService = new ConfigService();

export class CharacterDto {
  @Expose({ name: 'id' })
  _id: number;

  @Expose()
  name: string;

  @Expose()
  age: number;

  @Expose()
  breed: string;

  @Expose()
  sourceUrl: string;

  @Expose()
  imageUrl: string;

  @Expose()
  episode: string[];

  @Expose()
  minisodes: string[];

  @Expose()
  books: string[];

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  @Transform(
    ({ obj }) => `${configService.get<string>('url')}/characters/${obj.id}`
  )
  url: string;
}
