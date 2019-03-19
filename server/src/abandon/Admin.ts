// admin实体
// 所谓实体其实就是用装饰器@Table装饰的一个model。
import { ObjectIdColumn, ObjectID, Column, Entity  } from 'typeorm'
import Speech from '../entities/Post'

// 装饰器模式
@Entity()
export default class Admin {
  // 主键及其长度
  // primaryGeneratedColumn生成的主键会自增长
  // primaryColumn生成的主键类型不限
  // Defining entities and columns is almost the same as in relational databases,
  // the main difference is that you must use @ObjectIdColumn instead of @PrimaryColumn or @PrimaryGeneratedColumn.
  // mongodb的collection必须声明ObjectIdColumn
  @ObjectIdColumn()
  id: ObjectID

  // 列及其长度
  @Column({ length: 16 })
  admin: string

  // string若不设置长度会默认给一个255的限制
  @Column({ length: 40 })
  password: string

  // Speech是子文档类型
  @Column(type => Speech)
  speechs: Speech[]
}