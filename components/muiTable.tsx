import { useMediaQuery } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import MaterialTable, { MaterialTableProps } from 'material-table';
import React from 'react';
import tableIcons from '../utils/tableIcons';

export default function MuiTable<RowData extends object>( props: MaterialTableProps<RowData> ) {
	const mobile = !useMediaQuery( ( theme: Theme ) => theme.breakpoints.up( 'sm' ) );
	
	return <MaterialTable
		title='Shopping Cart'
		icons={ tableIcons }
		options={ { pageSize: mobile ? 6 : 10, pageSizeOptions: [ 6, 8, 10, 15, 20, 30 ] } }
		{ ...props }/>;
}
