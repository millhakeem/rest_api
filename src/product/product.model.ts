import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ _id: false })
class ProductCharacteristic {
	@Prop()
	name: string;

	@Prop()
	value: string;
}

export const ProductCharacteristicSchema = SchemaFactory.createForClass(ProductCharacteristic);

@Schema({ timestamps: true })
export class Product {
	@Prop()
	image: string;

	@Prop()
	title: string;

	@Prop()
	price: number;

	@Prop()
	oldPrice?: number;

	@Prop()
	credit: number;

	@Prop()
	calculatedRating: number;

	@Prop()
	decription: string;

	@Prop()
	advantages: string;

	@Prop()
	disAdvantages: string;

	@Prop([String])
	categories: string[];

	@Prop([String])
	tags: string[];

	@Prop({ type: [ProductCharacteristicSchema] })
	characteristics: ProductCharacteristic[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
