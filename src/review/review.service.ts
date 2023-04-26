import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './review.model';

@Injectable()
export class ReviewService {
	constructor(@InjectModel(Review.name) private readonly reviewModel: Model<Review>) {}

	async createReview(dto: CreateReviewDto): Promise<Review> {
		return this.reviewModel.create(dto);
	}

	async deleteReview(id: string): Promise<Review | null> {
		return this.reviewModel.findByIdAndDelete(id).exec();
	}

	async findReviewByProductId(productId: string): Promise<Review[]> {
		return this.reviewModel.find({ productId }).exec();
	}

	async deleteByProductId(productId: string) {
		return this.reviewModel.deleteMany({ productId }).exec();
	}
}
