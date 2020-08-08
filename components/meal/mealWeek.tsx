import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import MealButton from './mealButton';
import MealSelection from './mealSelection';

const useStyles = makeStyles( {
	separator: {
		padding: 10,
		display: 'inline'
	}
} );

export default function MealWeek( { weekData, mealData, selections, setData }: {
	weekData: {
		day: string;
		skip: boolean;
		selection: { [ id: string ]: number };
		treats: { [ id: string ]: number };
	};
	mealData: { [ category: string ]: { [ id: string ]: { name: string, img: string } } };
	selections: number;
	setData: ( data ) => void;
} ) {
	const classes = useStyles();
	
	const [ mealAnchorEl, setMealAnchorEl ] = React.useState( null ),
	      [ addAnchorEl, setAddAnchorEl ]   = React.useState( null );
	
	return <div>
		<MealButton
			filled={ !weekData.skip }
			onClick={ () => setData( { skip: false } ) }
		>{ weekData.day }</MealButton>
		
		<MealButton
			filled={ weekData.skip }
			color='secondary'
			onClick={ () => setData( { skip: true } ) }
		>Skip This Week</MealButton>
		
		<div className={ classes.separator }/>
		
		<MealButton
			filled={ !!Object.keys( weekData.selection ).length }
			disabled={ weekData.skip }
			onClick={ e => setMealAnchorEl( e.currentTarget ) }
		>Select Meal</MealButton>
		<MealSelection
			weekData={ weekData.selection }
			mealData={ mealData }
			selections={ selections }
			setData={ data => setData( { selection: data } ) }
			anchor={ mealAnchorEl }
			setAnchor={ setMealAnchorEl }/>
		
		<MealButton
			filled={ !Object.keys( weekData.selection ).length }
			disabled={ weekData.skip }
			onClick={ () => setData( { selection: {} } ) }
		>Surprise Me!</MealButton>
		
		<MealButton
			filled={ !!Object.keys( weekData.treats ).length }
			disabled={ weekData.skip }
			color='secondary'
			onClick={ () => setData( { treats: weekData.treats ? {} : { 'true': 1 } } ) }
		>Add Local Treats</MealButton>
		<MealSelection
			weekData={ weekData.treats }
			mealData={ mealData }
			setData={ data => setData( { treats: data } ) }
			anchor={ addAnchorEl }
			setAnchor={ setAddAnchorEl }/>
	</div>;
}
