import { Column } from "typeorm"

// meta作为附加属性，不会通过meta查询表数据，所以meta无需单独建表
export class Meta {
  @Column('int', {default: 0})
  views: number

  @Column('int', {default: 0})
  likes: number

  @Column('int', {default: 0})
  comments: number
}

// 给Tag单独建表
// export class Tag {
//   @Column({default: ''})
//   name: string

//   @Column({default: ''})
//   descript: string

//   @CreateDateColumn()
//   create_at: string
// }