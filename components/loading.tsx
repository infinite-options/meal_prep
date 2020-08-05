import { CircularProgress, Fade, Grid, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import React from 'react';

export default function Loading( { error = false } ) {
	const theme = useTheme();
	
	return <Grid item container justify='center' style={ { marginTop: theme.spacing( 6 ) } }>
		{ error ? <Typography>Unable to Connect</Typography>
			: <Fade
				in={ true }
				style={ { transitionDelay: '800ms' } }
				unmountOnExit>
				<CircularProgress/>
			</Fade> }
	
	</Grid>;
}
