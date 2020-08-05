import { createWrapper } from 'next-redux-wrapper';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './rootReducer';

// BINDING MIDDLEWARE
function bindMiddleware( middleware ) {
	if ( process.env.NODE_ENV !== 'production' ) {
		return composeWithDevTools( applyMiddleware( ...middleware ) );
	}
	return applyMiddleware( ...middleware );
}

function makeStore( { isServer } ) {
	if ( isServer ) {
		//If it's on server side, create a store
		return createStore( rootReducer, bindMiddleware( [ thunkMiddleware ] ) );
	} else {
		//If it's on client side, create a store which will persist
		const persistConfig = {
			key:       'app-persist',
			blacklist: [ 'alerts' ],
			storage
		};
		
		const persistedReducer = persistReducer( persistConfig, rootReducer );
		const store = createStore( persistedReducer, bindMiddleware( [ thunkMiddleware ] ) );
		store[ '__persistor' ] = persistStore( store );
		
		return store;
	}
}

// Export the wrapper & wrap the pages/_app.js with this wrapper only
export const wrapper = createWrapper( makeStore as any );

export const useTypedSelector: TypedUseSelectorHook<ReturnType<typeof rootReducer>> = useSelector;
