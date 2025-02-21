import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PageModule } from './page/page.module';
import { SectionModule } from './section/section.module';
import { ProjectHouseModule } from './project-house/project-house.module';
import { CommunicationModule } from './communication/communication.module';
import { FaqModule } from './faq/faq.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from './mail/mail.module';
import jwtConfig from './config/jwt.config';
import mailConfig from './config/mail.config';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env.production' : `.env.${ENV}`,
      load: [appConfig, databaseConfig, jwtConfig, mailConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        autoLoadEntities: true,
        synchronize: true,
        port: +configService.get('database.port'),
        host: configService.get('database.host'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.databaseName'),
      }),
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('jwt.secret'),
        signOptions: {
          expiresIn: configService.get<string>('jwt.expiresIn'),
          issuer: configService.get<string>('jwt.issuer'),
          audience: configService.get<string>('jwt.audience'),
        },
      }),
      global: true,
    }),
    PageModule,
    SectionModule,
    ProjectHouseModule,
    CommunicationModule,
    FaqModule,
    AuthModule,
    UserModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
