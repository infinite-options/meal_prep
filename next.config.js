const withPWA = require( 'next-pwa' );

let exportsConfig = {
	env: {
		STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY
	},
	pwa: {
		dest: 'public'
	}
};

const withBundleAnalyzer = require( '@next/bundle-analyzer' )( {
	enabled: process.env.ANALYZE === 'true'
} );
exportsConfig = withBundleAnalyzer( exportsConfig );

if ( process.env.NODE_ENV === 'production' ) {
	exportsConfig = withPWA( exportsConfig );
}

module.exports = exportsConfig;
