import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	NotFoundException,
	Param,
	Patch,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { Product } from './product.model';
import { FindProductDto } from './dto/find-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { PRODUCT_NOT_FOUND } from './product.const';

@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Post('create')
	async create(@Body() dto: CreateProductDto) {
		return this.productService.createProduct(dto);
	}

	@Get(':id')
	async get(@Param('id') id: string) {
		const product = await this.productService.findProductById(id);

		if (!product) {
			throw new NotFoundException(PRODUCT_NOT_FOUND);
		}

		return product;
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		const product = await this.productService.deleteProductById(id);

		if (!product) {
			throw new NotFoundException(PRODUCT_NOT_FOUND);
		}
	}

	@Patch(':id')
	async patch(@Param('id') id: string, @Body() dto: Product) {
		const product = await this.productService.updateProductById(id, dto);

		if (!product) {
			throw new NotFoundException(PRODUCT_NOT_FOUND);
		}

		return product;
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('find')
	async find(@Body() dto: FindProductDto) {
		return this.productService.findWithReviews(dto);
	}
}
