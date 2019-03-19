// Post实体
// 所谓实体其实就是用装饰器@Table装饰的一个model。
import { Column, CreateDateColumn, Entity, ObjectIdColumn, ObjectID, UpdateDateColumn } from 'typeorm'

// 装饰器模式
@Entity()
export default class Post {
  // 主键及其长度
  @ObjectIdColumn()
  id: ObjectID

  // 列及其长度
  @Column({ length: 16 })
  admin: string

  // 列及其长度
  @Column({ length: 200 })
  text: string

  // string若不设置长度会默认给一个255的限制
  @CreateDateColumn()
  create_time: Date

  @UpdateDateColumn()
  update_time: Date
}
