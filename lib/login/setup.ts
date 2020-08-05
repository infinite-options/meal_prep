import passport from 'passport';
import initialize from '../db/initialize';
import User, { UserI } from '../db/models/user';
import sequelize from '../db/sequelize';
import localLogin from './local';

export default function passportSetup() {
	localLogin();
	
	passport.serializeUser( ( user: UserI, done ) => {
		done( null, user.id );
	} );
	passport.deserializeUser( async ( id, done ) => {
		const user: UserI = await User.findOne( { where: { id } } );
		done( null, user );
	} );
	
	initialize().then( () => {
		sequelize.authenticate()
			.then( () => console.log( 'Connection has been established successfully.' ) )
			.catch( err => console.error( 'Unable to connect to the database:', err ) );
	} );
}
