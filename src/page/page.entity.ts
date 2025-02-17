import {
  Column,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class Page {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
  })
  title: string;

  @Column({
    type: 'number',
    nullable: true,
  })
  pageId: number;

  @ManyToOne(() => Page, (parentPage) => parentPage.subPages, {
    nullable: true,
  })
  parentPage: Page;

  @OneToMany(() => Page, (subPages) => subPages.parentPage)
  subPages: Page[];

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
