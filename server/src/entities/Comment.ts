import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm"
import Post from './Post'

@Entity()
export default class Comment {
  @PrimaryGeneratedColumn()
  id: number

  @Column('char', {length: 255})
  name: string

  @Column('char', {length: 255})
  email: string

  @Column('char', {length: 255, default: ''})
  link?: string

  @Column('varchar', {default: ''})
  content: string

  @ManyToOne(type => Post, post => post.comment)
  post?: Post

  // string若不设置长度会默认给一个255的限制
  @CreateDateColumn()
  created_at?: Date
}