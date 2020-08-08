export const scheduleData = Array( 1 )
	.fill( undefined )
	.map( ( data, i ) => ( {
		day:       `Sunday ${ i * 7 }`,
		skip:      false,
		selection: {},
		treats:    {}
	} ) );

const base = 'https://prep-to-your-door-s3.s3-us-west-1.amazonaws.com/PTYD_images/';

export const mealData = Array( 6 )
	.fill( {
		'Weekly Specials':  {
			1: { name: 'Cashew Alfredo Pasta', img: `${ base }Cashew+Alfredo+Pasta.jpg` },
			2: { name: 'Kale Power Salad', img: `${ base }Kale+Power+Salad.jpg` },
			3: { name: 'Lentil Soup', img: `${ base }Lentil+Soup.jpg` }
		},
		'Seasonal Favorites':  {
			4: { name: 'Caesar Salad', img: undefined },
			5: {
				name: 'Coconut Cardamom Oats w/ Strawberry Jam',
				img:  `${ base }Coconut+Cardamom+Oats.png`
			},
			6: { name: 'Kung Pao Brussels', img: `${ base }Kung+Pao+Brussels.jpg` }
		},
		'Smoothies': {
			7: { name: 'The Original', img: undefined },
			8: { name: 'Almond Butter', img: undefined },
			9: { name: 'The Engergizer', img: undefined }
		},
		'Add Ons':    {
			10: { name: 'Black Rice Salad', img: `${ base }Black+Rice+Salad.JPG` },
			11: { name: 'Gingerbread Oats', img: `${ base }Gingerbread+Oats.jpg` },
			12: { name: 'Rainbow Zoodles', img: `${ base }Rainbow+Zoodles.jpg` },
			13: { name: 'Berry Beet Boost', img: undefined }
		}
	} );
