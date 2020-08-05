import { Button, ButtonProps } from '@material-ui/core';
import React, { FormHTMLAttributes } from 'react';

export function SingleButton( { children, onClick, ...props }: ButtonProps ) {
	const val = React.useRef<NodeJS.Timeout>( null );
	
	React.useEffect( () => () => {
		if ( val.current ) clearTimeout( val.current );
	}, [] );
	
	return <Button
		{ ...props }
		onClick={ e => {
			if ( val.current ) return;
			val.current = setTimeout( () => val.current = null, 2000 );
			onClick && onClick( e );
		} }>
		{ children }
	</Button>;
}

export function SingleForm( { children, onSubmit, ...props }: FormHTMLAttributes<HTMLFormElement> ) {
	const val = React.useRef<NodeJS.Timeout>( null );
	
	React.useEffect( () => () => {
		if ( val.current ) clearTimeout( val.current );
	}, [] );
	
	return <form
		{ ...props }
		onSubmit={ e => {
			if ( val.current ) return;
			val.current = setTimeout( () => val.current = null, 2000 );
			onSubmit && onSubmit( e );
		} }>
		{ children }
	</form>;
}
