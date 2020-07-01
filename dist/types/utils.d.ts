import { Observable as ZenObservable } from 'apollo-link';
import { Address, ICommonQueryOptions } from './types';
import BN = require('bn.js');
export declare function fromWei(amount: BN): string;
export declare function toWei(amount: string | number): BN;
export declare function checkWebsocket(options: {
    url: string;
}): void;
export declare function hexStringToUint8Array(hexString: string): Uint8Array;
export declare function concat(a: Uint8Array, b: Uint8Array): Uint8Array;
declare type EthereumEvent = any;
export declare function eventId(event: EthereumEvent): string;
export declare function isAddress(address: Address): void;
/**
 * convert a ZenObservable to an rxjs.Observable
 * @param  zenObservable [description]
 * @return an Observable instance
 */
export declare function zenToRxjsObservable(zenObservable: ZenObservable<any>): any;
/** convert the number representation of RealMath.sol representations to real real numbers
 * @param  t a BN instance of a real number in the RealMath representation
 * @return  a BN
 */
export declare function realMathToNumber(t: BN): number;
export declare const NULL_ADDRESS = "0x0000000000000000000000000000000000000000";
/**
 * creates a string to be plugsging into a graphql query
 * @example
 * `{  proposals ${createGraphQlQuery({ skip: 2}, 'id: "2"')}
 *    { id }
 * }`
 * @param  options [description]
 * @param  where   [description]
 * @return         [description]
 */
export declare function createGraphQlQuery(options: ICommonQueryOptions, where?: string): string;
export declare function createGraphQlWhereQuery(where?: {
    [key: string]: string | string[] | null;
}): string;
export declare function dateToSecondsSinceEpoch(date: Date): number;
export declare function secondSinceEpochToDate(seconds: number): Date;
/**
 * get the latest block time, or the current time, whichver is later
 *
 * @export
 * @param {*} web3
 * @returns
 */
export declare function getBlockTime(web3: any): Promise<Date>;
export {};
