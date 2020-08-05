/// <reference types="next" />
/// <reference types="next/types/global" />

import {
	GetServerSidePropsContext,
	GetServerSidePropsResult,
	NextApiRequest,
	NextApiResponse
} from 'next';
import { ParsedUrlQuery } from 'querystring';
import { UserI } from './lib/db/models/user';

export type ServerSideProps<P extends { [ key: string ]: any } = { [ key: string ]: any },
	Q extends ParsedUrlQuery = ParsedUrlQuery> = (
	context: GetServerSidePropsContext<Q> & { req?: Express.Request & { user?: UserI } }
) => Promise<GetServerSidePropsResult<P>>

export type AppInitialProps<P extends { [ key: string ]: any } = { [ key: string ]: any },
	Q extends ParsedUrlQuery = ParsedUrlQuery> = (
	initial: { ctx?: GetServerSidePropsContext<Q> & { req?: Express.Request & { user?: UserI } } }
) => Promise<P>

export declare type ApiHandler<T = any> =
	( req: NextApiRequest & Express.Request & { user?: UserI }, res: NextApiResponse<T> ) =>
		void | Promise<void>;
