import bcrypt from 'bcrypt';
import relations from '../../../lib/db/associations';
import User, { UserI } from '../../../lib/db/models/user';
import { ApiHandler } from '../../../next-env';
import { extractObj } from '../../../utils/serializeForm';

/**
 * GET - requires authentication
 *    admin - get all users
 *    else - no access
 * POST
 *    admin - modify self
 *       id - create or modify anyone
 *    else - create or modify self
 * DELETE - requires authentication
 *    admin - id - delete user with id
 *    else - no access
 *
 * @param req
 * @param res
 * @constructor
 */
const Users: ApiHandler = async function( req, res ) {
	relations();
	
	switch ( req.method ) {
	case 'GET': {
		if ( !req.isAuthenticated() ) {
			res.status( 401 ).send( 'Login Required' );
			return;
		}
		if ( req.user.role !== 'admin' ) {
			res.status( 403 ).send( 'Insufficient Credentials' );
			return;
		}
		
		const users: User[] = await User.findAll( {
			attributes: [ 'id', 'firstName', 'lastName', 'email', 'role' ],
			order:      [ [ 'updatedAt', 'DESC' ] ]
		} );
		res.json( users.map( user => user.get() ) );
		return;
	}
	case 'POST': {
		let { id = '', oldPassword, address: addressData, ...userData } = extractObj( req.body );
		
		if ( req.isAuthenticated() ) {
			if ( req.user.role !== 'admin' ) {
				id = req.user.id;
				
				// check password verification
				if ( oldPassword ) {
					if ( !await bcrypt.compare( oldPassword, req.user.password ) ) {
						res.status( 409 ).send( 'Passwords do not Match' );
						return;
					}
				}
			}
		} else if ( !( 'password' in userData ) ) {
			res.status( 406 ).send( 'Password Required' );
			return;
		} else {
			if ( await User.count( {
				where: {
					provider: 'local',
					email:    userData.email
				}
			} ) )
				return res.status( 409 ).send( 'Email Already Registered' );
			userData.provider = 'local';
		}
		if ( 'password' in userData ) userData.password = await bcrypt.hash( userData.password, 10 );
		
		let user: UserI = await User.findOne( { where: { id } } );
		if ( user ) await user.update( userData );
		else user = await User.create( userData );
		
		req.login( user, err => {
			if ( err ) return res.status( 500 ).send( 'Login Error' );
			res.send( user.id );
		} );
		return;
	}
	case 'DELETE': {
		if ( !req.isAuthenticated() ) {
			res.status( 401 ).send( 'Login Required' );
			return;
		}
		if ( req.user.role !== 'admin' ) {
			res.status( 403 ).send( 'Insufficient Credentials' );
			return;
		}
		
		let { id } = req.body;
		
		const val = await User.destroy( { where: { id } } );
		res.send( val.toString() );
		return;
	}
	}
	res.end();
};
export default Users;
