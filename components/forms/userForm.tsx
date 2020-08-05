import { Button, Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import $ from 'jquery';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import { UserI } from '../../lib/db/models/user';
import { setAlert } from '../../lib/store/alerts/action';
import { logout } from '../../lib/store/auth/action';
import serializeForm from '../../utils/serializeForm';
import { SingleButton, SingleForm } from '../singleAction';
import PasswordDialog from './passwordDialog';

const useStyles = makeStyles( theme => ( {
	redButton: {
		color:      theme.palette.getContrastText( theme.palette.error.main ),
		background: theme.palette.error.main
	}
} ) );

export default function UserForm( { defaultValues: user }: { defaultValues?: UserI } ) {
	const router = useRouter();
	const dispatch = useDispatch();
	const classes = useStyles();
	
	const [ open, setOpen ] = React.useState( false );
	
	return <SingleForm onSubmit={ e => {
		e.preventDefault();
		const { confirmPassword, ...data } = serializeForm( $( e.currentTarget ) );
		
		if ( confirmPassword !== data.password ) {
			dispatch( setAlert( 'Passwords do not Match' ) );
			return;
		}
		
		$.post( {
			url:   '/api/data/users',
			data:  serializeForm( $( e.currentTarget ) ),
			async success() {
				await router.push( '/' );
				dispatch( setAlert( user ? 'Settings Updated' : 'Account Created', 'success' ) );
			},
			error: err => dispatch( setAlert( err.responseText ) )
		} );
	} }>
		<Grid container spacing={ 2 }>
			<Grid item xs={ 12 }>
				<TextField
					fullWidth label='First Name' name='firstName' type='text'
					defaultValue={ user && user.firstName } required/>
			</Grid>
			<Grid item xs={ 12 }>
				<TextField
					fullWidth label='Last Name' name='lastName' type='text'
					defaultValue={ user && user.lastName } required/>
			</Grid>
			<Grid item xs={ 12 }>
				<TextField
					fullWidth label='Email' name='email' type='email'
					autoComplete='username' defaultValue={ user && user.email } required/>
			</Grid>
			<Grid item xs={ 12 }>
				<TextField
					fullWidth label='Phone Number (optional)' name='phoneNumber' type='tel'
					defaultValue={ user && user.phoneNumber }/>
			</Grid>
			{ ( user ? user.password && <Grid item xs={ 12 }>
				<SingleButton variant='contained' onClick={ () => setOpen( true ) }>
					Update Password
				</SingleButton>
			</Grid> : <>
				<Grid item xs={ 12 }>
					<TextField
						fullWidth label='Password' name='password' type='password'
						autoComplete='current-password' required/>
				</Grid>
				<Grid item xs={ 12 }>
					<TextField
						fullWidth label='Confirm Password' name='confirmPassword' type='password'
						autoComplete='current-password' required/>
				</Grid>
			</> ) }
			<Grid item container xs={ user ? 6 : 12 } justify='center'>
				<Button variant='contained' color='secondary' type='submit'>
					{ user ? 'Update' : 'Sign Up' }
				</Button>
			</Grid>
			{ user && <Grid item container xs={ 6 } justify='center'>
				<SingleButton
					className={ classes.redButton } variant='contained'
					onClick={ () => {
						$.ajax( {
							url:   '/api/auth/logout',
							async success() {
								dispatch( logout() );
								await router.push( '/login' );
							},
							error: err => dispatch( setAlert( err.responseText ) )
						} );
					} }>
					Logout
				</SingleButton>
			</Grid> }
		</Grid>
		<PasswordDialog open={ open } onClose={ () => setOpen( false ) }/>
	</SingleForm>;
}
