import bcrypt from 'bcrypt';
import User from './models/user';

export default async function seed() {
	await User.findOrCreate( {
		where:    {
			provider:  'local',
			email:     'root@localhost.com',
			firstName: 'Admin',
			lastName:  'User',
			role:      'admin'
		},
		defaults: {
			password: await bcrypt.hash( 'password', 10 )
		}
	} );
	
	await User.findOrCreate( {
		where:    {
			provider:  'local',
			email:     'test@localhost.com',
			firstName: 'Test',
			lastName:  'User',
			role:      'user'
		},
		defaults: {
			password: await bcrypt.hash( 'password', 10 )
		}
	} );
}
