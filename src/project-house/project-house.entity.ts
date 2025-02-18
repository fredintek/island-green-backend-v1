import { Page } from 'src/page/page.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProjectHouse {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Page, (page) => page.projectHouse, { onDelete: 'CASCADE' })
  projectPage: Page;

  @Column({
    type: 'json',
    nullable: false,
  })
  title: {
    en: string;
    ru: string;
    tr: string;
  };

  @Column({
    type: 'varchar',
    nullable: true,
  })
  coverImage: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  displayImage: string;

  @Column({
    type: 'json',
    nullable: false,
  })
  generalInfo: {
    en: string;
    ru: string;
    tr: string;
  };

  @Column({
    type: 'json',
    nullable: true,
  })
  features: {
    en: string;
    ru: string;
    tr: string;
  };

  @Column({
    type: 'json',
    nullable: true,
  })
  optionalFeatures: {
    en: string;
    ru: string;
    tr: string;
  };

  @Column({ type: 'json', nullable: true })
  gallery: {
    imageUrl: {
      publicId: string;
      url: string;
    };
    tag: string;
  }[];
}
