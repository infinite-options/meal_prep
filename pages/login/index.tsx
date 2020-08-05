import { useRouter } from 'next/router';
import React from 'react';
import LoginForm from '../../components/forms/loginForm';
import PaperWrapper from '../../components/paperWrapper';
import { useTypedSelector } from '../../lib/store/store';

export default function Login() {
	const user = useTypedSelector( store => store.auth.user );
	const router = useRouter();
	
	React.useEffect( () => {
		if ( user ) {
			router.push( '/' ).then();
			return;
		}
		
		// if ( caches ) {
		// 	caches.keys().then( async keyList => Promise.all(
		// 		keyList.map( async key => {
		// 			if ( 'v2'.indexOf( key ) !== -1 )
		// 				await caches.delete( key );
		// 		} )
		// 	) );
		// }
	}, [] );
	
	return <PaperWrapper title='Log In'>
		<LoginForm/>
	</PaperWrapper>;
}
