import {
	AppBar,
	BottomNavigation,
	BottomNavigationAction,
	Button,
	IconButton,
	Link as MuiLink,
	Menu,
	MenuItem,
	Toolbar,
	Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Home as HomeIcon, Menu as MenuIcon, Settings as SettingsIcon } from '@material-ui/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useTypedSelector } from '../lib/store/store';

const menu = [
	{ name: 'Home', url: '', icon: HomeIcon },
	{ name: 'Settings', url: 'settings', icon: SettingsIcon }
];
const paths = menu.reduce( ( obj, link, i ) => {
	obj[ link.url ] = i;
	return obj;
}, {} );

const useStyles = makeStyles( theme => ( {
	sectionMobile:   {
		display:                          'inherit',
		[ theme.breakpoints.up( 'sm' ) ]: {
			display: 'none'
		}
	},
	sectionDesktop:  {
		display:                          'none',
		[ theme.breakpoints.up( 'sm' ) ]: {
			display: 'inherit'
		}
	},
	menuButton:      {
		marginRight: theme.spacing( 2 )
	},
	menuRoutes:      {
		width:        'auto',
		paddingRight: theme.spacing()
	},
	titleSpacing:    {
		flexGrow: 1
	},
	status:          {
		display:    'flex',
		alignItems: 'center'
	},
	authName:        {
		paddingLeft:  theme.spacing(),
		paddingRight: theme.spacing()
	},
	bottomNav:       {
		width:           '100%',
		position:        'fixed',
		bottom:          0,
		backgroundColor: theme.palette.primary.main,
		zIndex:          10
	},
	navIcon:         {
		color: theme.palette.primary.contrastText
	},
	navIconSelected: {
		color: `${ theme.palette.primary.light } !important`
	}
} ) );

export default function Navigation() {
	const router = useRouter();
	const classes = useStyles();
	const store = useTypedSelector( store => ( { user: store.auth.user } ) );
	
	const [ page, setPage ]         = React.useState( 0 ),
	      [ anchorEl, setAnchorEl ] = React.useState<HTMLElement>( null );
	
	const path = router.pathname.split( '/' )[ 1 ];
	React.useEffect( () => {
		const newPage = paths[ path ];
		if ( newPage !== undefined ) setPage( newPage );
	}, [ path ] );
	
	return <AppBar position='sticky'>
		<Toolbar>
			
			<div className={ classes.sectionDesktop }>
				<IconButton
					edge='start'
					className={ classes.menuButton }
					color='inherit'
					onClick={ e => setAnchorEl( e.currentTarget ) }>
					<MenuIcon/>
				</IconButton>
				
				<Menu
					anchorEl={ anchorEl }
					keepMounted
					open={ !!anchorEl }
					onClose={ () => setAnchorEl( null ) }>
					{ menu.map( ( item, index ) =>
						<MenuItem key={ index } onClick={ async () => {
							await router.push( `/${ item.url }` );
							setAnchorEl( null );
						} }>
							<item.icon className={ classes.menuRoutes }/>
							{ item.name }
						</MenuItem> ) }
				</Menu>
			</div>
			
			<Link href='/'>
				<MuiLink href='' variant='h6' color='inherit' noWrap>
					Next App
				</MuiLink>
			</Link>
			
			<div className={ classes.titleSpacing }/>
			
			<div className={ classes.status }>
				{ store.user ? <Typography className={ classes.authName }>
						{ store.user.firstName } { store.user.lastName }
					</Typography> :
					<Link href='/login'>
						<Button color='inherit' variant='outlined'>Login</Button>
					</Link> }
			</div>
		
		</Toolbar>
		
		<div className={ classes.sectionMobile }>
			<BottomNavigation
				value={ page }
				classes={ { root: classes.bottomNav } }
				showLabels>
				{ menu.map( ( item, index ) => <BottomNavigationAction
					key={ index }
					classes={ { root: classes.navIcon, selected: classes.navIconSelected } }
					label={ item.name }
					icon={ <item.icon style={ { color: 'inherit' } }/> }
					onClick={ async () => {
						await router.push( `/${ item.url }` );
						setAnchorEl( null );
					} }/> ) }
			</BottomNavigation>
		</div>
	</AppBar>;
}
