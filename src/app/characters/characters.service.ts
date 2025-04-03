import { Injectable, NotFoundException } from '@nestjs/common';
import { Character } from './entities/character.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CharacterDto } from './dto/character.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CharactersService {
  constructor(
    @InjectRepository(Character)
    private readonly _character: Repository<Character>,
  ) {}

  async findAll(): Promise<{
    data: CharacterDto[];
    count: number;
    timestamp: string;
  }> {
    const characters = await this._character.find();
    const data = characters.map((character) =>
      plainToInstance(CharacterDto, character),
    );
    return {
      data,
      count: characters.length,
      timestamp: new Date().toISOString(),
    };
  }

  async findOne(
    id: number,
  ): Promise<{ data: CharacterDto; timestamp: string }> {
    const character = await this._character.findOne({ where: { id } });
    if (!character) {
      throw new NotFoundException('Character not found');
    }
    const data: CharacterDto = plainToInstance(CharacterDto, character, {
      excludeExtraneousValues: true,
    });
    return {
      data,
      timestamp: new Date().toISOString(),
    };
  }
}
