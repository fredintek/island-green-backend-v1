import { Page } from 'src/page/page.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Section {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Page, (page) => page.sections, { onDelete: 'CASCADE' })
  page: Page;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  type: string;

  @Column({
    type: 'json',
    nullable: true,
  })
  content: any;
}
