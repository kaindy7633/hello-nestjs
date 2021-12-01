import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { ConfigService, ConfigModule } from '@nestjs/config';
import envConfig from '../config/env';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 设置为全局
      envFilePath: [envConfig.path],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql', // 数据库类型
        // entities: [PostsEntity], // 数据表实体
        autoLoadEntities: true,
        host: configService.get('DB_HOST', 'localhost'), // 主机， 默认为localhost
        port: configService.get<number>('DB_PORT', 3306), // 端口号
        username: configService.get('DB_USER', 'root'), // 用户名
        password: configService.get('DB_PASSWD', '123456'), // 密码
        database: configService.get('DB_DATABASE', 'hello-nestjs'), // 数据库名
        timezone: '+08:00', // 服务器上配置的时区
        synchronize: true, // 根据实体自动创建数据表， 生产环境建议关闭
      }),
    }),
    PostsModule,
  ],
})
export class AppModule {}
