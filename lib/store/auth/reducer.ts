import { UserI } from '../../db/models/user';
import { LOGIN, LOGOUT } from './action';

const initialState: {
	user: UserI
} = {
	user: null
};

export default function reducer( state = initialState, action ): typeof initialState {
	switch ( action.type ) {
	case LOGIN:
		return action.payload;
	case LOGOUT:
		return initialState;
	default:
		return state;
	}
}
