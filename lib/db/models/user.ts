import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';

export default class User extends Model {
}

export interface UserI extends User {
	id?: string;
	provider?: string;
	password?: string;
	role?: 'admin' | 'user';
	firstName?: string;
	lastName?: string;
	email?: string;
	phoneNumber?: string;
}

User.init( {
	id:          {
		type:         DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey:   true
	},
	provider:    {
		type:      DataTypes.STRING,
		allowNull: false
	},
	password:    {
		type: DataTypes.STRING
	},
	role:        {
		type:         DataTypes.ENUM,
		defaultValue: 'user',
		values:       [ 'admin', 'user' ],
		allowNull:    false
	},
	firstName:   {
		type:      DataTypes.STRING,
		allowNull: false
	},
	lastName:    {
		type: DataTypes.STRING
	},
	email:       {
		type:      DataTypes.STRING,
		allowNull: false
	},
	phoneNumber: {
		type: DataTypes.STRING
	}
}, {
	tableName: 'users',
	sequelize,
	indexes:   [
		{
			unique: true,
			fields: [ 'provider', 'email' ]
		}
	]
} );
