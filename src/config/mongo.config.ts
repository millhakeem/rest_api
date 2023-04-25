import { ConfigService, registerAs } from '@nestjs/config';

export const getMongoConfig = async (configService: ConfigService) => {
	return {
		uri: getMongoString(configService),
		...getMongoOptions(),
	};
};

const getMongoString = (configService: ConfigService) =>
	'mongo://' +
	configService.get('MONGO_LOGIN') +
	':' +
	configService.get('MONGO_PASSWORD') +
	'@' +
	configService.get('MONGO_LOGIN') +
	':' +
	configService.get('MONGO_PORT') +
	'/' +
	configService.get('MONGO_AUTHDATABASE');

const getMongoOptions = () => ({
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
});

export default registerAs('database', () => ({
	login: process.env.MONGO_LOGIN,
	pass: process.env.MONGO_PASSWORD,
	host: process.env.MONGO_LOGIN,
	port: process.env.MONGO_PORT || 27017,
	db: process.env.MONGO_AUTHDATABASE,
}));
