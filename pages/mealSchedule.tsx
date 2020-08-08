import React from 'react';
import { mealData, scheduleData } from '../components/meal/data';
import MealWeek from '../components/meal/mealWeek';

export default function MealSchedule() {
	const [ data, setData ] = React.useState( scheduleData );
	
	return <div>
		{ data.map( ( weekData, i ) => <div key={ i }>
			<MealWeek
				weekData={ weekData }
				mealData={ mealData[ i ] }
				selections={ 5 }
				setData={ ( data ) => setData( oldData => {
					oldData[ i ] = { ...oldData[ i ], ...data };
					return [ ...oldData ];
				} ) }/>
			<br/>
		</div> ) }
	</div>;
}
