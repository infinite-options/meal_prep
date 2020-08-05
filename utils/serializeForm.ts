export default function serializeForm( form: JQuery<EventTarget> ): { [ key: string ]: string | any } {
	const formArray = form.serializeArray();
	let result = {};
	for ( const item of formArray ) {
		result[ item.name ] = item.value;
	}
	return result;
}

export function extractObj( obj: any ): { [ key: string ]: string | any } {
	let result = {};
	for ( const key in obj ) {
		// noinspection JSUnfilteredForInLoop
		result = assign( result, key, obj[ key ] );
	}
	return result;
}

function assign( obj, prop, value ) {
	if ( typeof prop === 'string' )
		prop = prop.split( '.' );
	
	if ( prop.length > 1 ) {
		const e = prop.shift();
		obj[ e ] = assign( e in obj ? obj[ e ] : {}, prop, value );
	} else
		obj[ prop[ 0 ] ] = value;
	return obj;
}
