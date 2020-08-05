import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

export default class MyDocument extends Document {
	render() {
		// noinspection HtmlRequiredTitleElement
		return <Html lang='en'>
			<Head>
				<meta
					name='viewport'
					content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no'/>
				<meta name='description' content='From Farm to Your Doorstep - Shop Local, Eat Local'/>
				
				{/*<link rel='icon' type='image/png' sizes='32x32' href='/icons/favicon-32x32.png'/>*/ }
				{/*<link rel='icon' type='image/png' sizes='16x16' href='/icons/favicon-16x16.png'/>*/ }
				<link rel="apple-touch-icon" href="/icons/icon-192x192.png"/>
				
				{/*<link*/ }
				{/*	href="splashscreens/iphone6_splash.png"*/ }
				{/*	media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"*/ }
				{/*	rel="apple-touch-startup-image"/>*/ }
				{/*<link*/ }
				{/*	href="splashscreens/iphoneplus_splash.png"*/ }
				{/*	media="(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)"*/ }
				{/*	rel="apple-touch-startup-image"/>*/ }
				{/*<link*/ }
				{/*	href="splashscreens/iphonex_splash.png"*/ }
				{/*	media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"*/ }
				{/*	rel="apple-touch-startup-image"/>*/ }
				{/*<link*/ }
				{/*	href="splashscreens/iphonexr_splash.png"*/ }
				{/*	media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)"*/ }
				{/*	rel="apple-touch-startup-image"/>*/ }
				{/*<link*/ }
				{/*	href="splashscreens/iphonexsmax_splash.png"*/ }
				{/*	media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)"*/ }
				{/*	rel="apple-touch-startup-image"/>*/ }
				
				<meta name="theme-color" content="#A0050F"/>
				
				<link rel='manifest' href='/manifest.json'/>
				
				<link
					rel='stylesheet'
					href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'/>
			</Head>
			<body>
			<Main/>
			<NextScript/>
			</body>
		</Html>;
	}
}
