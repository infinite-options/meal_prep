import passport from 'passport';
import { ApiHandler } from '../../../../../next-env';
import redirect from '../../../../../utils/redirect';

const GoogleCallback: ApiHandler = ( req, res ) =>
	passport.authenticate( 'google', ( err, user ) => {
		if ( err || !user ) return redirect( res, '/login' );
		req.login( user, err => {
			if ( err ) return redirect( res, '/login' );
			redirect( res, '/login/callback' );
		} );
	} )( req, res );
export default GoogleCallback;
