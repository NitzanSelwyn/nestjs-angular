import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  userEmail: string;

  @Column()
  userName: string;

  @Column()
  address: string;

  @Column()
  password: string;
}
