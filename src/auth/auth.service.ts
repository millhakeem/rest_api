import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.model';
import { Model } from 'mongoose';
import { hashSync } from 'bcrypt';

@Injectable()
export class AuthService {
	constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

	async createUser(dto: AuthDto) {
		const newUser = new this.userModel({
			email: dto.login,
			passwordHash: hashSync(dto.password, 10),
		});

		return newUser.save();
	}

	async findUser(email: string) {
		return this.userModel.findOne({ email }).exec();
	}
}
