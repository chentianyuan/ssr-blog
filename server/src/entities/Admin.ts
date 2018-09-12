// admin实体
// 所谓实体其实就是用装饰器@Table装饰的一个model。
import { PrimaryColumn, Column, Entity } from 'typeorm'

// 装饰器模式
@Entity()
export default class Admin {
  // 主键及其长度
  @PrimaryColumn({ length: 16 })
  admin: string

  // 列及其长度
  @Column({ length: 40 })
  password: string
}