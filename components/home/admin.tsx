import $ from 'jquery';
import React from 'react';
import { useDispatch } from 'react-redux';
import useSWR, { mutate } from 'swr';
import User, { UserI } from '../../lib/db/models/user';
import { setAlert } from '../../lib/store/alerts/action';
import fetcher from '../../utils/fetcher';
import Loading from '../loading';
import MuiTable from '../muiTable';

export default function Admin() {
	const dispatch = useDispatch();
	
	const { data, error } = useSWR<UserI[]>( '/api/data/users', fetcher );
	if ( error || !data ) return <Loading error={ error }/>;
	
	return <MuiTable
		title='Users List'
		columns={ [
			{ title: 'First Name', field: 'firstName' },
			{ title: 'Last Name', field: 'lastName' },
			{ title: 'Email', field: 'email' },
			{ title: 'Password', field: 'password', render: () => 'hidden' },
			{
				title:  'Role', field: 'role',
				lookup: { admin: 'Admin', farmer: 'Farmer', user: 'User' }
			}
		] }
		data={ data }
		editable={ {
			async onRowUpdate( newData, oldData ) {
				if ( !oldData ) return;
				if ( newData.password === '' ) delete newData.password;
				$.post( {
					url:   '/api/data/users',
					data:  newData,
					async success() {
						await mutate( '/api/data/users' );
						dispatch( setAlert( 'Entry Changed', 'success' ) );
					},
					error: err => dispatch( setAlert( err.responseText ) )
				} );
			},
			async onRowDelete( oldData ) {
				$.ajax( {
					url:    '/api/data/users',
					method: 'DELETE',
					data:   { id: oldData.id },
					async success() {
						await mutate( '/api/data/users' );
						dispatch( setAlert( 'Entry Deleted', 'success' ) );
					},
					error:  err => dispatch( setAlert( err.responseText ) )
				} );
			}
		} }/>;
}
