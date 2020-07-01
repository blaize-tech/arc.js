import BN = require('bn.js');
import { Observable } from 'rxjs';
import { Arc, IApolloQueryOptions } from './arc';
import { Address, ICommonQueryOptions, IStateful } from './types';
export interface IRewardStaticState {
    id: string;
    beneficiary: Address;
    createdAt: Date;
    proposalId: string;
    reputationForVoter: BN;
    tokensForStaker: BN;
    daoBountyForStaker: BN;
    reputationForProposer: BN;
    tokenAddress: Address;
}
export interface IRewardState extends IRewardStaticState {
    reputationForVoterRedeemedAt: number;
    tokensForStakerRedeemedAt: number;
    reputationForProposerRedeemedAt: number;
    daoBountyForStakerRedeemedAt: number;
}
export interface IRewardQueryOptions extends ICommonQueryOptions {
    where?: {
        id?: string;
        beneficiary?: Address;
        dao?: Address;
        proposal?: string;
        createdAtAfter?: Date;
        createdAtBefore?: Date;
        [key: string]: any;
    };
}
export declare class Reward implements IStateful<IRewardState> {
    idOrOpts: string | IRewardStaticState;
    context: Arc;
    static fragments: {
        RewardFields: import("graphql").DocumentNode;
    };
    /**
     * Reward.search(context, options) searches for reward entities
     * @param  context an Arc instance that provides connection information
     * @param  options the query options, cf. IRewardQueryOptions
     * @return         an observable of Reward objects
     */
    static search(context: Arc, options?: IRewardQueryOptions, apolloQueryOptions?: IApolloQueryOptions): Observable<Reward[]>;
    id: string;
    staticState: IRewardStaticState | undefined;
    constructor(idOrOpts: string | IRewardStaticState, context: Arc);
    state(apolloQueryOptions?: IApolloQueryOptions): Observable<IRewardState>;
    setStaticState(opts: IRewardStaticState): void;
    fetchStaticState(): Promise<IRewardStaticState>;
}
