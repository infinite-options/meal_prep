import { ApiHandler } from '../../../next-env';

const Logout: ApiHandler = function( req, res ) {
	req.logout();
	return res.end();
};
export default Logout;
