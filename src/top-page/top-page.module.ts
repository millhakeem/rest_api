import { Module } from '@nestjs/common';
import { TopPageController } from './top-page.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TopPage, TopPageSchema } from './top-page.model';
import { TopPageService } from './top-page.service';

@Module({
	imports: [MongooseModule.forFeature([{ name: TopPage.name, schema: TopPageSchema }])],
	controllers: [TopPageController],
	providers: [TopPageService],
	exports: [TopPageService],
})
export class TopPageModule {}
