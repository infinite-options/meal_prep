import { CssBaseline } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { useStore } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Alerts from '../components/alerts';
import Loading from '../components/loading';
import Navigation from '../components/navigation';
import { wrapper } from '../lib/store/store';

const theme = createMuiTheme( {
	palette: {
		primary:   {
			main: '#427c42'
		},
		secondary: {
			main: '#cd790c'
		}
	}
} );

function App( { Component, pageProps }: AppProps ) {
	const store = useStore();
	
	return <>
		<Head>
			<title>App</title>
			<meta
				name='viewport'
				content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no'/>
		</Head>
		<PersistGate persistor={ store[ '__persistor' ] } loading={ <Loading/> }>
			<ThemeProvider theme={ theme }>
				<CssBaseline/>
				<Alerts/>
				<Navigation/>
				<Component { ...pageProps }/>
				<div style={ { height: 56 } }/>
			</ThemeProvider>
		</PersistGate>
	</>;
}

export default wrapper.withRedux( App );
