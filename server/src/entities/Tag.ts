// Dao定义实体和列
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm'
import Post from './Post'
@Entity()
export default class Tag {
  // tag主键
  @PrimaryGeneratedColumn()
  id: number

  @Column('char')
  tagName: string

  // @Column({default: 0})
  // count: Number

  @ManyToMany(type => Post, post => post.tags)
  posts: Post[]

  @CreateDateColumn()
  create_at: Date

  @UpdateDateColumn()
  update_at: Date
}