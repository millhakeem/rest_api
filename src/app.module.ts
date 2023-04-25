import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { TopPageModule } from './top-page/top-page.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import mongoConfig from './config/mongo.config';

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [mongoConfig],
		}),
		MongooseModule.forRoot('mongodb://admin:admin@localhost:27017/admin'),
		AuthModule,
		ProductModule,
		ReviewModule,
		TopPageModule,
		UsersModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
