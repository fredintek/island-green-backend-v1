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
    type: 'json',
    nullable: false,
  })
  coverImage: {
    publicId: string;
    url: string;
  };

  @Column({
    type: 'json',
    nullable: false,
  })
  displayImage: {
    publicId: string;
    url: string;
  };

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

  @Column({
    type: 'json',
    nullable: true,
  })
  homeText: {
    en: string;
    ru: string;
    tr: string;
  };

  @Column({
    type: 'boolean',
    nullable: false,
    default: false,
  })
  isHomePage: boolean;

  @Column({
    type: 'json',
    nullable: true,
  })
  homeImages: {
    publicId: string;
    url: string;
  }[];
}
