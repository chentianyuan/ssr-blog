import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar')
  @Unique('uniqueName', ['username'])
  username: string

  @Column('varchar')
  password: string

  // string若不设置长度会默认给一个255的限制
  @CreateDateColumn()
  created_at?: Date

  @UpdateDateColumn()
  updated_at?: Date
}