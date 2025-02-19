import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Communication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
    nullable: false,
    default: '[]',
  })
  phoneNumber: string;

  @Column({
    type: 'text',
    nullable: false,
    default: '[]',
  })
  email: string;

  @Column({
    type: 'text',
    nullable: false,
    default: '[]',
  })
  address: string;
}
