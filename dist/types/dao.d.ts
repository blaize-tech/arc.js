import BN = require('bn.js');
import { Observable } from 'rxjs';
import { Arc } from './arc';
import { IApolloQueryOptions } from './graphnode';
import { IMemberQueryOptions, Member } from './member';
import { IProposalCreateOptions, IProposalQueryOptions, Proposal } from './proposal';
import { Reputation } from './reputation';
import { IRewardQueryOptions, Reward } from './reward';
import { ISchemeQueryOptions, Scheme } from './scheme';
import { IStakeQueryOptions, Stake } from './stake';
import { Token } from './token';
import { Address, ICommonQueryOptions, IStateful } from './types';
import { IVoteQueryOptions, Vote } from './vote';
export interface IDAOStaticState {
    id: Address;
    address: Address;
    name: string;
    register: 'na' | 'proposed' | 'registered' | 'unRegistered';
    reputation: Reputation;
    token: Token;
    tokenName: string;
    tokenSymbol: string;
}
export interface IDAOState extends IDAOStaticState {
    memberCount: number;
    reputationTotalSupply: BN;
    tokenTotalSupply: BN;
    dao: DAO;
    numberOfQueuedProposals: number;
    numberOfPreBoostedProposals: number;
    numberOfBoostedProposals: number;
}
export interface IDAOQueryOptions extends ICommonQueryOptions {
    where?: {
        address?: Address;
        name?: string;
        register?: 'na' | 'proposed' | 'registered' | 'unRegistered';
        [key: string]: any;
    };
}
export declare class DAO implements IStateful<IDAOState> {
    context: Arc;
    static fragments: {
        DAOFields: import("graphql").DocumentNode;
    };
    /**
     * DAO.search(context, options) searches for DAO entities
     * @param  context an Arc instance that provides connection information
     * @param  options the query options, cf. IDAOQueryOptions
     * @return         an observable of DAO objects
     */
    static search(context: Arc, options?: IDAOQueryOptions, apolloQueryOptions?: IApolloQueryOptions): Observable<DAO[]>;
    id: Address;
    staticState: IDAOStaticState | undefined;
    constructor(idOrOpts: Address | IDAOStaticState, context: Arc);
    setStaticState(opts: IDAOStaticState): void;
    fetchStaticState(): Promise<IDAOStaticState>;
    /**
     * get the current state of the DAO
     * @return an Observable of IDAOState
     */
    state(apolloQueryOptions?: IApolloQueryOptions): Observable<IDAOState>;
    nativeReputation(): Observable<Reputation>;
    schemes(options?: ISchemeQueryOptions, apolloQueryOptions?: IApolloQueryOptions): Observable<Scheme[]>;
    scheme(options: ISchemeQueryOptions): Promise<Scheme>;
    members(options?: IMemberQueryOptions, apolloQueryOptions?: IApolloQueryOptions): Observable<Member[]>;
    member(address: Address): Member;
    /**
     * create a new proposal in this DAO
     * @param  options [description]
     * @return a Proposal instance
     */
    createProposal(options: IProposalCreateOptions): import("./operation").IOperationObservable<import("./operation").ITransactionUpdate<Proposal>>;
    proposals(options?: IProposalQueryOptions, apolloQueryOptions?: IApolloQueryOptions): Observable<Proposal[]>;
    proposal(proposalId: string): Proposal;
    rewards(options?: IRewardQueryOptions, apolloQueryOptions?: IApolloQueryOptions): Observable<Reward[]>;
    votes(options?: IVoteQueryOptions, apolloQueryOptions?: IApolloQueryOptions): Observable<Vote[]>;
    stakes(options?: IStakeQueryOptions, apolloQueryOptions?: IApolloQueryOptions): Observable<Stake[]>;
    /**
     * get (an observable of) the Ether balance of the DAO from the web3Provider
     *
     * @return an observable stream of BN number instances
     */
    ethBalance(): Observable<BN>;
}
