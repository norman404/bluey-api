import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity('characters')
export class Character {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 100 })
  name: string

  @Column({ length: 100 })
  breed: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @Column({ name: 'source_url', nullable: true })
  sourceUrl: string

  @Column({ name: 'image_url', nullable: true })
  imageUrl: string

  @Column('simple-array', { default: [] })
  episode: []

  @Column('simple-array', { default: [] })
  minisodes: []

  @Column('simple-array', { default: [] })
  books: []
}
