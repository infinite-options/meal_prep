import { Container, Grid, Paper, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles( theme => ( {
	paper: {
		padding:                            theme.spacing( 4 ),
		marginTop:                          theme.spacing( 4 ),
		[ theme.breakpoints.down( 'xs' ) ]: {
			backgroundColor: theme.palette.background.default,
			marginTop:       0
		}
	},
	title: {
		marginBottom: theme.spacing()
	}
} ) );

export default function PaperWrapper( { title, children } ) {
	const classes = useStyles();
	const mobile = !useMediaQuery<Theme>( theme => theme.breakpoints.up( 'sm' ) );
	
	return <Container fixed maxWidth='md'>
		<Paper className={ classes.paper } elevation={ mobile ? 0 : 3 }>
			<Grid container justify='center' className={ classes.title }>
				<Typography variant='h5'>{ title }</Typography>
			</Grid>
			{ children }
		</Paper>
	</Container>;
}
