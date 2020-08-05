import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../lib/store/auth/action';
import { useTypedSelector } from '../../lib/store/store';

export default function Callback() {
	const user = useTypedSelector( store => store.auth.user );
	const router = useRouter();
	const dispatch = useDispatch();
	
	React.useEffect( () => {
		if ( !user ) {
			router.push( '/login' ).then();
		} else {
			dispatch( login( user ) );
		}
	}, [] );
	
	return null;
}
