import BN = require('bn.js');
import { Observable } from 'rxjs';
import { Arc, IApolloQueryOptions } from './arc';
import { Address, ICommonQueryOptions, IStateful } from './types';
export interface IReputationState {
    address: Address;
    totalSupply: BN;
    dao: Address;
}
export interface IReputationQueryOptions extends ICommonQueryOptions {
    id?: string;
    dao?: Address;
    [key: string]: any;
}
export declare class Reputation implements IStateful<IReputationState> {
    id: Address;
    context: Arc;
    /**
     * Reputation.search(context, options) searches for reputation entities
     * @param  context an Arc instance that provides connection information
     * @param  options the query options, cf. IReputationQueryOptions
     * @return         an observable of Reputation objects
     */
    static search(context: Arc, options?: IReputationQueryOptions, apolloQueryOptions?: IApolloQueryOptions): Observable<Reputation[]>;
    address: Address;
    constructor(id: Address, context: Arc);
    state(apolloQueryOptions?: IApolloQueryOptions): Observable<IReputationState>;
    reputationOf(address: Address): Observable<BN>;
    contract(): any;
    mint(beneficiary: Address, amount: BN): import("./operation").Operation<any>;
}
