import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	Input,
	TextField
} from '@material-ui/core';
import $ from 'jquery';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setAlert } from '../../lib/store/alerts/action';
import serializeForm from '../../utils/serializeForm';
import { SingleButton, SingleForm } from '../singleAction';

export default function PasswordDialog( { open, onClose }: { open: boolean, onClose: () => void } ) {
	const dispatch = useDispatch();
	
	return <Dialog open={ open } onClose={ onClose }>
		<SingleForm onSubmit={ e => {
			e.preventDefault();
			const { confirmPassword, ...data } = serializeForm( $( e.currentTarget ) );
			if ( confirmPassword !== data.password ) {
				dispatch( setAlert( 'Passwords do not match' ) );
				return;
			}
			
			$.post( {
				url:   '/api/data/users',
				data,
				async success() {
					onClose();
					dispatch( setAlert( 'Password Updated', 'success' ) );
				},
				error: err => dispatch( setAlert( err.responseText ) )
			} );
		} }>
			<DialogTitle>Update Password</DialogTitle>
			<DialogContent>
				<Input type='hidden' autoComplete='username'/>
				<Grid container spacing={ 2 }>
					<Grid item xs={ 12 }>
						<TextField
							fullWidth label='Old Password' name='oldPassword' type='password'
							autoComplete='current-password' autoFocus required/>
					</Grid>
					<Grid item xs={ 12 }>
						<TextField
							fullWidth label='New Password' name='password' type='password'
							autoComplete='new-password' required/>
					</Grid>
					<Grid item xs={ 12 }>
						<TextField
							fullWidth label='Confirm Password' name='confirmPassword' type='password'
							autoComplete='new-password' required/>
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				<SingleButton variant='contained' onClick={ onClose }>Cancel</SingleButton>
				<Button variant='contained' color='secondary' type='submit'>Update</Button>
			</DialogActions>
		</SingleForm>
	</Dialog>;
}
