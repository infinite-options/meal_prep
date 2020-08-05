import { Color } from '@material-ui/lab';
import { CLEAR_ALERT, SET_ALERT } from './action';

const initialState: {
	open: boolean
	message: string
	type: Color
} = {
	open:    false,
	message: '',
	type:    'error'
};

export default function reducer( state = initialState, action ): typeof initialState {
	switch ( action.type ) {
	case SET_ALERT:
		return { ...action.payload, open: true };
	case CLEAR_ALERT:
		return { ...state, open: false };
	default:
		return state;
	}
}
