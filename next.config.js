const withPWA = require( 'next-pwa' );

const exportsConfig = {
	env: {
		STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY
	},
	pwa: {
		dest: 'public'
	}
};

if ( process.env.ANALYZE ) {
	const { BundleAnalyzerPlugin } = require( 'webpack-bundle-analyzer' );
	
	exports.webpack = config => {
		// Fixes npm packages that depend on `fs` module
		config.node = {
			fs: 'empty'
		};
		
		config.plugins.push( new BundleAnalyzerPlugin( {
			analyzerMode: 'static',
			analyzerHost: '127.0.0.1',
			analyzerPort: 8888,
			openAnalyzer: false
		} ) );
		
		return config;
	};
}

module.exports = process.env.NODE_ENV === 'production' ?
	withPWA( exportsConfig ) :
	exportsConfig;
