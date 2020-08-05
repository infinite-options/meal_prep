import bcrypt from 'bcrypt';
import passport from 'passport';
import { Strategy } from 'passport-local';
import User, { UserI } from '../db/models/user';

export default function LocalStrategy() {
	passport.use( new Strategy( {
			usernameField: 'email'
		},
		async ( email, password, done ) => {
			const user: UserI = await User.findOne( {
				where: {
					provider: 'local',
					email
				}
			} );
			
			if ( !user ) return done( null, false, { message: 'Incorrect Credentials' } );
			
			const result = await bcrypt.compare( password, user.password );
			if ( !result ) return done( null, false, { message: 'Incorrect Credentials' } );
			
			return done( null, user );
		}
	) );
}
