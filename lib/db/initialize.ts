import { dev } from '../_config';
import associations from './associations';
import seed from './seed';
import sequelize from './sequelize';

export default async function dbInitialize() {
	associations();
	await sequelize.sync();
	if ( dev ) await seed();
}
