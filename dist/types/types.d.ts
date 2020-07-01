import { Observable } from 'rxjs';
import { IApolloQueryOptions } from './graphnode';
export declare type Address = string;
export declare type Date = number;
export declare type Hash = string;
export declare type Web3Receipt = any;
export declare type Web3Provider = string | object;
export declare type IPFSProvider = string;
export interface IStateful<T> {
    state: (apolloQueryOptions: IApolloQueryOptions) => Observable<T>;
}
export interface ICommonQueryOptions {
    skip?: number;
    first?: number;
    orderBy?: string;
    orderDirection?: 'asc' | 'desc';
    where?: any;
}
