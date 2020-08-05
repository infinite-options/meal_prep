import { useRouter } from 'next/router';
import React from 'react';
import UserForm from '../components/forms/userForm';
import PaperWrapper from '../components/paperWrapper';
import { useTypedSelector } from '../lib/store/store';

export default function Settings() {
	const user = useTypedSelector( store => store.auth.user );
	const router = useRouter();
	if ( !user ) {
		router.push( '/login' ).then();
		return null;
	}
	
	return <PaperWrapper title='Settings'>
		<UserForm defaultValues={ user }/>
	</PaperWrapper>;
}
