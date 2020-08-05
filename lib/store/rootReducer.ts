import { combineReducers } from 'redux';
import alertsReducer from './alerts/reducer';
import authReducer from './auth/reducer';

export default combineReducers( {
	alerts: alertsReducer,
	auth:   authReducer
} );
