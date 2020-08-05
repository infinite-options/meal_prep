import { UserI } from '../../db/models/user';

export const LOGIN = 'login';
export const LOGOUT = 'logout';

export function login( user: UserI ) {
	return {
		type:    LOGIN,
		payload: { user }
	};
}

export function logout() {
	return {
		type: LOGOUT
	};
}
