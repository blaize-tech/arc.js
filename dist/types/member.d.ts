import BN = require('bn.js');
import { Observable } from 'rxjs';
import { Arc, IApolloQueryOptions } from './arc';
import { DAO } from './dao';
import { IProposalQueryOptions, Proposal } from './proposal';
import { Reward } from './reward';
import { IStakeQueryOptions, Stake } from './stake';
import { Address, ICommonQueryOptions, IStateful } from './types';
import { IVoteQueryOptions, Vote } from './vote';
export interface IMemberStaticState {
    id?: string;
    address: Address;
    contract?: Address;
    dao?: Address;
}
export interface IMemberState extends IMemberStaticState {
    contract: Address;
    id: string;
    reputation: BN;
}
export interface IMemberQueryOptions extends ICommonQueryOptions {
    where?: {
        id?: string;
        address?: Address;
        dao?: Address;
    };
}
/**
 * Represents an account that holds reputaion in a specific DAO
 */
export declare class Member implements IStateful<IMemberState> {
    context: Arc;
    static fragments: {
        ReputationHolderFields: import("graphql").DocumentNode;
    };
    /**
     * Member.search(context, options) searches for member entities
     * @param  context an Arc instance that provides connection information
     * @param  options the query options, cf. IMemberQueryOptions
     * @return         an observable of IRewardState objects
     */
    static search(context: Arc, options?: IMemberQueryOptions, apolloQueryOptions?: IApolloQueryOptions): Observable<Member[]>;
    id: string | undefined;
    staticState: IMemberStaticState | undefined;
    /**
     * @param address addresssof the member
     * @param daoAdress addresssof the DAO this member is a member of
     * @param context an instance of Arc
     */
    constructor(idOrOpts: string | IMemberStaticState, context: Arc);
    fetchStaticState(): Promise<IMemberStaticState>;
    calculateId(opts: {
        contract: Address;
        address: Address;
    }): string;
    setStaticState(opts: IMemberStaticState): IMemberStaticState;
    state(apolloQueryOptions?: IApolloQueryOptions): Observable<IMemberState>;
    dao(): Promise<DAO>;
    rewards(): Observable<Reward[]>;
    proposals(options?: IProposalQueryOptions, apolloQueryOptions?: IApolloQueryOptions): Observable<Proposal[]>;
    stakes(options?: IStakeQueryOptions, apolloQueryOptions?: IApolloQueryOptions): Observable<Stake[]>;
    votes(options?: IVoteQueryOptions, apolloQueryOptions?: IApolloQueryOptions): Observable<Vote[]>;
}
