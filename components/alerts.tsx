import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React from 'react';
import { useDispatch } from 'react-redux';
import { clearAlert } from '../lib/store/alerts/action';
import { useTypedSelector } from '../lib/store/store';

export default function Alerts() {
	const store    = useTypedSelector( store => store.alerts ),
	      dispatch = useDispatch();
	
	const handleClose = () => dispatch( clearAlert() );
	
	return <Snackbar
		anchorOrigin={ {
			vertical:   'top',
			horizontal: 'center'
		} }
		open={ store.open }
		autoHideDuration={ 6000 }
		onClose={ handleClose }>
		<Alert severity={ store.type } onClose={ handleClose }>
			{ store.message }
		</Alert>
	</Snackbar>;
}
