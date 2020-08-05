import {
	AddBox,
	ArrowDownward,
	Check,
	ChevronLeft,
	ChevronRight,
	Clear,
	DeleteOutline,
	Edit,
	FilterList,
	FirstPage,
	LastPage,
	Remove,
	SaveAlt,
	Search,
	ViewColumn
} from '@material-ui/icons';
import { Dictionary } from 'express-serve-static-core';
import { Icons } from 'material-table';
import React, { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';

const iconsMap = {
	Add:             AddBox,
	Check,
	Clear,
	Delete:          DeleteOutline,
	DetailPanel:     ChevronRight,
	Edit,
	Export:          SaveAlt,
	Filter:          FilterList,
	FirstPage,
	LastPage,
	NextPage:        ChevronRight,
	PreviousPage:    ChevronLeft,
	ResetSearch:     Clear,
	Search,
	SortArrow:       ArrowDownward,
	ThirdStateCheck: Remove,
	ViewColumn
};

type IconsDict = Dictionary<ForwardRefExoticComponent<RefAttributes<SVGSVGElement>>>;

export default Object.entries( iconsMap ).reduce<Icons>( ( icon, [ iconName, IconComponent ] ) => {
	( icon as IconsDict )[ iconName ] = forwardRef( ( props, ref ) => <IconComponent { ...props }
	                                                                                 ref={ ref }/> );
	return icon;
}, {} );
