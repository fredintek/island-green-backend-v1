import { ProjectHouse } from 'src/project-house/project-house.entity';
import { Section } from 'src/section/section.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Page {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'json',
    nullable: false,
    unique: true,
  })
  title: {
    en: string;
    ru: string;
    tr: string;
  };

  @ManyToOne(() => Page, (parentPage) => parentPage.subPages, {
    nullable: true,
  })
  parentPage: Page;

  @OneToMany(() => Page, (subPages) => subPages.parentPage)
  subPages: Page[];

  @OneToMany(() => Section, (section) => section.page, { cascade: true })
  sections: Section[];

  @OneToMany(() => ProjectHouse, (projectHouse) => projectHouse.projectPage)
  projectHouse: ProjectHouse[];

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
