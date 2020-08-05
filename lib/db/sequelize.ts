import { Sequelize } from 'sequelize';
import { dev } from '../_config';

const sequelize = dev ?
	new Sequelize( {
		dialect: 'sqlite',
		storage: `${ process.env.SQLITE_PATH }/${ process.env.SQLITE_FILE }`,
		logging: false
	} ) :
	new Sequelize( process.env.DB_SCHEMA, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
		dialect: 'mysql',
		host:    process.env.DB_HOST,
		logging: false
	} );

export default sequelize;
