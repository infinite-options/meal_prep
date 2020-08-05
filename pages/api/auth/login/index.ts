import passport from 'passport';
import { UserI } from '../../../../lib/db/models/user';
import { ApiHandler } from '../../../../next-env';

const Login: ApiHandler = function( req, res ) {
	passport.authenticate( 'local', ( err, user: UserI ) => {
		if ( err ) return res.status( 500 ).send( 'Server Authentication Error' );
		if ( !user ) return res.status( 401 ).send( 'Invalid Credentials' );
		
		req.login( user, err => {
			if ( err ) return res.status( 500 ).send( 'Server Login Error' );
			res.send( user.get() );
		} );
	} )( req, res );
};
export default Login;
