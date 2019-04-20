// Post实体
// 所谓实体其实就是用装饰器@Table装饰的一个model。
import { Column, CreateDateColumn, Entity, UpdateDateColumn, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm'
import { Meta } from '../model/postModel'
import Tag from './Tag'

// 装饰器模式
@Entity()
export default class Post {
  // 主键及其长度
  @PrimaryGeneratedColumn()
  id: number

  // 标题
  @Column({ length: 20 })
  title: string

  // 描述
  @Column({ default: 'aaa' })
  descript: string

  @Column(type => Meta)
  meta: Meta

  @ManyToMany(type => Tag, tag => tag.posts)
  @JoinTable()
  tags: Tag[]

  // 文章内容
  @Column('longtext')
  content: string

  // string若不设置长度会默认给一个255的限制
  @CreateDateColumn()
  created_at?: Date

  @UpdateDateColumn()
  updated_at?: Date
}
