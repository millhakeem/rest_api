import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.model';
import { Model } from 'mongoose';
import { compare, hash } from 'bcrypt';
import { BAD_CREDENTIALS } from './auth.const';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(User.name) private readonly userModel: Model<User>,
		private readonly jwtService: JwtService,
	) {}

	async createUser(dto: AuthDto) {
		const newUser = new this.userModel({
			email: dto.login,
			passwordHash: await hash(dto.password, 10),
		});

		return newUser.save();
	}

	async findUser(email: string) {
		return this.userModel.findOne({ email }).exec();
	}

	async validateUser(email: string, password: string): Promise<Pick<User, 'email'>> {
		const user = await this.findUser(email);

		if (!user) {
			throw new UnauthorizedException(BAD_CREDENTIALS);
		}

		const isPasswordValid = await compare(password, user.passwordHash);

		if (!isPasswordValid) {
			throw new UnauthorizedException(BAD_CREDENTIALS);
		}

		return { email: user.email };
	}

	async login(email: string) {
		const payload = { email };

		return {
			access_token: await this.jwtService.signAsync(payload),
		};
	}
}
