import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.model';
import { FindProductDto } from './dto/find-product.dto';
import { Review } from 'src/review/review.model';

@Injectable()
export class ProductService {
	constructor(@InjectModel(Product.name) private readonly productModel: Model<Product>) {}

	async createProduct(dto: CreateProductDto): Promise<Product> {
		return this.productModel.create(dto);
	}

	async findProductById(id: string): Promise<Product | null> {
		return this.productModel.findById(id).exec();
	}

	async deleteProductById(id: string): Promise<Product | null> {
		return this.productModel.findByIdAndDelete(id).exec();
	}

	async updateProductById(id: string, dto: CreateProductDto): Promise<Product | null> {
		return this.productModel.findByIdAndUpdate(id, dto, { new: true }).exec();
	}

	async findWithReviews(dto: FindProductDto) {
		return this.productModel
			.aggregate([
				{
					$match: {
						categories: dto.category,
					},
				},
				{
					$sort: {
						_id: 1,
					},
				},
				{
					$limit: dto.limit,
				},
				{
					$lookup: {
						from: 'reviews',
						localField: 'productId',
						foreignField: 'id',
						as: 'reviews',
					},
				},
				{
					$addFields: {
						reviewCount: { $size: '$reviews' },
						reviewAvg: { $avg: '$reviews.rating' },
					},
				},
			])
			.exec() as unknown as (Product & {
			reviews: Review[];
			reviewsCount: number;
			reviewsAvg: number;
		})[];
	}
}
