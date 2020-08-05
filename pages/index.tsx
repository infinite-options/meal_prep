import { useRouter } from 'next/router';
import React from 'react';
import Admin from '../components/home/admin';
import Main from '../components/home/main';
import { useTypedSelector } from '../lib/store/store';

export default function Index() {
	const user = useTypedSelector( store => store.auth.user );
	const router = useRouter();
	if ( !user ) {
		router.push( '/login' ).then();
		return null;
	}
	
	switch ( user.role ) {
	case 'admin':
		return <Admin/>;
	}
	return <Main/>;
}
