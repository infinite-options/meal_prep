import { NextApiHandler } from 'next';
import passport from 'passport';
import { UserI } from '../../../../../lib/db/models/user';

const google: NextApiHandler = ( req, res ) =>
	passport.authenticate( 'google',
		{ scope: [ 'profile', 'email' ] }, ( err, user: UserI ) => {
			if ( !err ) {
				res.send( user.get() );
			}
		} )
	( req, res );
export default google;
