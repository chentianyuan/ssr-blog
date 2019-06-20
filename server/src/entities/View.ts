import { Entity, PrimaryGeneratedColumn, Column  } from "typeorm";

@Entity()
export default class View {
  @PrimaryGeneratedColumn()
  id: number

  @Column('int')
  view_times: number
}
