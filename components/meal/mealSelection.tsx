import { IconButton, ListSubheader, Menu, MenuItem } from '@material-ui/core';
import { Add as AddIcon, Remove as RemoveIcon } from '@material-ui/icons';
import React from 'react';

export default function MealSelection( { weekData, mealData, selections, setData, anchor, setAnchor }: {
	weekData: { [ id: string ]: number };
	mealData: { [ category: string ]: { [ id: string ]: { name: string, img: string } } };
	selections?: number;
	setData: ( data ) => void;
	anchor;
	setAnchor: React.Dispatch<any>;
} ) {
	const totalSelected = selections ? Object.values( weekData ).reduce( ( a, b ) => a + b, 0 ) : 0;
	
	return <Menu
		anchorEl={ anchor }
		open={ !!anchor }
		onClose={ () => setAnchor( null ) }>
		{ totalSelected ? `Total: ${ selections }, Selected: ${ totalSelected }` : '' }
		{ Object.keys( mealData ).map( ( category, i ) => <div key={ i }>
			<ListSubheader>{ category }</ListSubheader>
			{ Object.keys( mealData[ category ] ).map( ( id, i ) =>
				<MenuItem key={ i } disableRipple={ true }>
					<IconButton onClick={ () => {
						if ( weekData[ id ] === 1 )
							delete weekData[ id ];
						else if ( weekData[ id ] )
							weekData[ id ] = ( weekData[ id ] || 1 ) - 1;
						setData( weekData );
					} }><RemoveIcon/></IconButton>
					{ weekData[ id ] || 0 }
					<IconButton onClick={ () => {
						if ( totalSelected && ( totalSelected >= selections ) ) return;
						weekData[ id ] = ( weekData[ id ] || 0 ) + 1;
						setData( weekData );
					} }><AddIcon/></IconButton>
					{ mealData[ category ][ id ].name }
				</MenuItem> ) }
		</div> ) }
	
	</Menu>;
}
