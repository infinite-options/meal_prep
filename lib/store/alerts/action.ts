import { Color } from '@material-ui/lab';

export const SET_ALERT = 'setAlert';
export const CLEAR_ALERT = 'clearAlert';

export function setAlert( message: string, type: Color = 'error' ) {
	return {
		type:    SET_ALERT,
		payload: {
			message,
			type
		}
	};
}

export function clearAlert() {
	return {
		type: CLEAR_ALERT
	};
}
