import { DataSource } from 'typeorm'
import { ConfigService } from '@nestjs/config'
import { config } from 'dotenv'
config()

const configService = new ConfigService()

const AppDataSource = new DataSource({
  type: 'postgres',
  host: configService.get<string>('POSTGRES_HOST'),
  port: 6543,
  username: configService.get<string>('POSTGRES_USER'),
  password: configService.get<string>('POSTGRES_PASSWORD'),
  database: configService.get<string>('POSTGRES_DB'),
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: false,
  migrations: ['src/database/migrations/*-migration.ts'],
  migrationsRun: false,
  logging: true
})

export default AppDataSource
