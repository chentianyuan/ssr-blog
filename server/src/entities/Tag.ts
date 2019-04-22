// Dao定义实体和列
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, Unique } from 'typeorm'
import Post from './Post'
@Entity()
export default class Tag {
  // tag主键
  @PrimaryGeneratedColumn()
  id: number
  
  @Column('varchar', {length: 100})
  @Unique('uniqueName', ['tagName'])
  tagName: string

  @Column('int', {default: 1})
  count: number

  @ManyToMany(type => Post, post => post.tags)
  posts: Post[]
  
  // @CreateDateColumn()
  // create_at: Date

  // @UpdateDateColumn()
  // update_at: Date
}