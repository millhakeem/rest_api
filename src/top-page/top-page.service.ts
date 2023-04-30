import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TopLevelCategory, TopPage } from './top-page.model';
import { Model } from 'mongoose';
import { CreateTopPageDto } from './dto/create-top-page.dto';

@Injectable()
export class TopPageService {
	constructor(@InjectModel(TopPage.name) private readonly topPageModel: Model<TopPage>) {}

	async createTopPage(dto: CreateTopPageDto) {
		return this.topPageModel.create(dto);
	}

	async getTopPageById(id: string) {
		return this.topPageModel.findById(id).exec();
	}

	async getTopPageByAlias(alias: string) {
		return this.topPageModel.findOne({ alias }).exec();
	}

	async deleteTopPageById(id: string) {
		return this.topPageModel.findByIdAndDelete(id).exec();
	}

	async updateTopPageById(id: string, dto: CreateTopPageDto) {
		return this.topPageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
	}

	async findPageByCategory(firstCategory: TopLevelCategory) {
		return this.topPageModel
			.find({ firstCategory }, { alias: 1, secondCategory: 1, title: 1 })
			.exec();
	}

	async findByText(text: string) {
		return this.topPageModel.find({ $text: { $search: text, $caseSensitive: false } }).exec();
	}
}
