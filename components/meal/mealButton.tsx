import { Button, PropTypes } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles( {
	button: {
		width:  110,
		height: 110
	}
} );

export default function MealButton( { filled, color = 'primary', disabled = false, children, onClick }: {
	filled: boolean;
	color?: PropTypes.Color;
	disabled?: boolean;
	children;
	onClick?: ( e: React.MouseEvent<HTMLButtonElement> ) => void;
} ) {
	const classes = useStyles();
	
	return <Button
		variant={ filled ? 'contained' : 'outlined' }
		className={ classes.button }
		color={ filled ? color : undefined }
		disabled={ disabled }
		onClick={ onClick }
	>{ children }</Button>;
};
