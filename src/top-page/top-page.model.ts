import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export enum TopLevelCategory {
	Courses,
	Services,
	Books,
	Products,
}

export type TopPageDocument = HydratedDocument<TopPage>;

@Schema({ _id: false })
export class HhData {
	count: number;
	juniorSalary: number;
	middleSalary: number;
	seniorSalary: number;
}

export const HhDataSchema = SchemaFactory.createForClass(HhData);

@Schema({ _id: false })
export class TopPageAdvantage {
	@Prop()
	title: string;

	@Prop()
	description: string;
}

export const TopPageAdvantageSchema = SchemaFactory.createForClass(TopPageAdvantage);

@Schema({ timestamps: true })
export class TopPage {
	@Prop({ enum: TopLevelCategory })
	firstCategory: TopLevelCategory;

	@Prop()
	secondCategory: string;

	@Prop({ unique: true })
	alias: string;

	@Prop()
	title: string;

	@Prop()
	category: string;

	@Prop({ type: HhDataSchema })
	hh?: HhData;

	@Prop({ type: [TopPageAdvantageSchema] })
	advantages: TopPageAdvantage[];

	@Prop()
	seoText: string;

	@Prop()
	tagsTitle: string;

	@Prop([String])
	tags: string[];
}

export const TopPageSchema = SchemaFactory.createForClass(TopPage);
