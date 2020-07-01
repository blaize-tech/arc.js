import BN = require('bn.js');
import { Observable } from 'rxjs';
import { Arc, IApolloQueryOptions } from './arc';
import { IProposalOutcome } from './proposal';
import { Address, ICommonQueryOptions, IStateful } from './types';
export interface IStakeStaticState {
    id?: string;
    staker: Address;
    createdAt: Date | undefined;
    outcome: IProposalOutcome;
    amount: BN;
    proposal: string;
}
export interface IStakeState extends IStakeStaticState {
    id: string;
}
export interface IStakeQueryOptions extends ICommonQueryOptions {
    where?: {
        id?: string;
        staker?: Address;
        dao?: Address;
        proposal?: string;
        createdAt?: number;
        [key: string]: any;
    };
}
export declare class Stake implements IStateful<IStakeState> {
    context: Arc;
    static fragments: {
        StakeFields: import("graphql").DocumentNode;
    };
    /**
     * Stake.search(context, options) searches for stake entities
     * @param  context an Arc instance that provides connection information
     * @param  options the query options, cf. IStakeQueryOptions
     * @return         an observable of Stake objects
     */
    static search(context: Arc, options?: IStakeQueryOptions, apolloQueryOptions?: IApolloQueryOptions): Observable<Stake[]>;
    id: string | undefined;
    staticState: IStakeStaticState | undefined;
    constructor(idOrOpts: string | IStakeStaticState, context: Arc);
    state(apolloQueryOptions?: IApolloQueryOptions): Observable<IStakeState>;
    setStaticState(opts: IStakeStaticState): void;
    fetchStaticState(): Promise<IStakeStaticState>;
}
