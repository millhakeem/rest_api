import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import mongoConfig from './config/mongo.config';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { TopPageModule } from './top-page/top-page.module';

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
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
