import connect_sqlite3 from 'connect-sqlite3';
import express from 'express';
import express_mysql_session from 'express-mysql-session';
import session from 'express-session';
import next from 'next';
import passport from 'passport';
import { dev } from './lib/_config';
import passportSetup from './lib/login/setup';

const app = next( { dev } );
const handler = app.getRequestHandler();

app.prepare().then( () => {
	const server = express();
	
	let store;
	if ( dev ) {
		const SQLiteStore = connect_sqlite3( session );
		store = new SQLiteStore( {
			table: 'sessions',
			dir:   process.env.SQLITE_PATH,
			db:    process.env.SQLITE_FILE
		} );
	} else {
		const MySQLStore = express_mysql_session( session as any );
		store = new MySQLStore( {
			host:                process.env.DB_HOST,
			port:                3306,
			user:                process.env.DB_USERNAME,
			password:            process.env.DB_PASSWORD,
			database:            process.env.DB_SCHEMA,
			createDatabaseTable: true
		} );
	}
	server.use( session( {
		store,
		secret:            process.env.SESSION_SECRET_KEY,
		resave:            false,
		saveUninitialized: false
	} ) );
	
	server.use( passport.initialize() );
	server.use( passport.session() );
	
	passportSetup();
	
	server.all( '*', ( req, res ) => handler( req, res ) );
	
	server.listen( process.env.PORT as any || 80, undefined, undefined, err => {
		if ( err ) throw err;
		if ( dev ) console.log( '> Ready on http://localhost' );
	} );
} );
