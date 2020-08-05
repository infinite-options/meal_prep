import { Button, Grid, Link as MuiLink, TextField, Typography } from '@material-ui/core';
import $ from 'jquery';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setAlert } from '../../lib/store/alerts/action';
import { login } from '../../lib/store/auth/action';
import serializeForm from '../../utils/serializeForm';
import { SingleForm } from '../singleAction';

export default function LoginForm() {
	const router = useRouter();
	const dispatch = useDispatch();
	
	return <SingleForm onSubmit={ e => {
		e.preventDefault();
		$.ajax( {
			url:   '/api/auth/login',
			data:  serializeForm( $( e.currentTarget ) ),
			async success( user ) {
				dispatch( login( user ) );
				await router.push( '/' );
			},
			error: err => dispatch( setAlert( err.responseText ) )
		} );
	} }>
		<Grid container spacing={ 2 }>
			<Grid item xs={ 12 }>
				<TextField
					fullWidth label='Email' name='email' type='email'
					id='email' autoComplete='username' autoFocus required/>
			</Grid>
			<Grid item xs={ 12 }>
				<TextField
					fullWidth label='Password' name='password' type='password'
					autoComplete='current-password' required/>
			</Grid>
			<Grid item xs={ 12 }>
				<Typography>
					<MuiLink href='' onClick={ e => {
						e.preventDefault();
						const email = $( '#email' ).val();
						if ( !email ) {
							dispatch( setAlert( 'Email field required' ) );
							return;
						}
						$.ajax( {
							url:     '/api/auth/forgot',
							data:    { email },
							success: () => dispatch( setAlert( 'Reset email sent', 'success' ) ),
							error:   err => dispatch( setAlert( err.responseText ) )
						} );
					} }>
						Forgot password?
					</MuiLink>
				</Typography>
			</Grid>
			<Grid item container xs={ 6 } justify='center'>
				<Button variant='contained' color='secondary' type='submit'>
					Login
				</Button>
			</Grid>
			<Grid item container xs={ 6 } justify='center'>
				<Link href='/login/signup'>
					<Button variant='contained'>
						Sign Up
					</Button>
				</Link>
			</Grid>
		</Grid>
	</SingleForm>;
}
