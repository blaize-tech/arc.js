import BN = require('bn.js');
import { Observable } from 'rxjs';
import { Arc, IApolloQueryOptions } from './arc';
import { Address, Hash, ICommonQueryOptions, IStateful } from './types';
export interface ITokenState {
    address: Address;
    name: string;
    owner: Address;
    symbol: string;
    totalSupply: BN;
}
export interface ITokenQueryOptions extends ICommonQueryOptions {
    where?: {
        address?: Address;
        name?: string;
        owner?: Address;
        symbol?: string;
        [key: string]: any;
    };
}
export interface IApproval {
    id: Hash;
    txHash: Hash;
    contract: Address;
    owner: Address;
    spender: Address;
    value: BN;
}
export interface IAllowance {
    token: Address;
    owner: Address;
    spender: Address;
    amount: BN;
}
export declare class Token implements IStateful<ITokenState> {
    id: Address;
    context: Arc;
    /**
     * Token.search(context, options) searches for token entities
     * @param  context an Arc instance that provides connection information
     * @param  options the query options, cf. ITokenQueryOptions
     * @return         an observable of Token objects
     */
    static search(context: Arc, options?: ITokenQueryOptions, apolloQueryOptions?: IApolloQueryOptions): Observable<Token[]>;
    address: string;
    constructor(id: Address, context: Arc);
    state(apolloQueryOptions?: IApolloQueryOptions): Observable<ITokenState>;
    contract(mode?: 'readonly'): any;
    balanceOf(owner: string): Observable<BN>;
    allowance(owner: Address, spender: Address): Observable<BN>;
    mint(beneficiary: Address, amount: BN): import("./operation").Operation<any>;
    transfer(beneficiary: Address, amount: BN): import("./operation").Operation<any>;
    approveForStaking(spender: Address, amount: BN): import("./operation").Operation<any>;
}
