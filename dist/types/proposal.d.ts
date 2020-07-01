import BN = require('bn.js');
import { Observable } from 'rxjs';
import { Arc, IApolloQueryOptions } from './arc';
import { DAO } from './dao';
import { IGenesisProtocolParams } from './genesisProtocol';
import { Operation } from './operation';
import { IQueueState } from './queue';
import { IRewardQueryOptions, Reward } from './reward';
import { ISchemeState } from './scheme';
import { ICompetitionProposalState, IProposalCreateOptionsCompetition } from './schemes/competition';
import * as ContributionReward from './schemes/contributionReward';
import * as ContributionRewardExt from './schemes/contributionRewardExt';
import * as GenericScheme from './schemes/genericScheme';
import * as SchemeRegistrar from './schemes/schemeRegistrar';
import { IStakeQueryOptions, Stake } from './stake';
import { Address, Date, ICommonQueryOptions, IStateful } from './types';
import { IVoteQueryOptions, Vote } from './vote';
export declare const IProposalType: {
    SchemeRegistrarAdd: SchemeRegistrar.IProposalType.SchemeRegistrarAdd;
    SchemeRegistrarEdit: SchemeRegistrar.IProposalType.SchemeRegistrarEdit;
    SchemeRegistrarRemove: SchemeRegistrar.IProposalType.SchemeRegistrarRemove;
    GenericScheme: GenericScheme.IProposalType.GenericScheme;
    ContributionReward: ContributionReward.IProposalType.ContributionReward;
};
declare type IProposalType = (ContributionReward.IProposalType | GenericScheme.IProposalType | SchemeRegistrar.IProposalType);
export declare enum IProposalOutcome {
    None = 0,
    Pass = 1,
    Fail = 2
}
export declare enum IProposalStage {
    ExpiredInQueue = 0,
    Executed = 1,
    Queued = 2,
    PreBoosted = 3,
    Boosted = 4,
    QuietEndingPeriod = 5
}
export declare enum IExecutionState {
    None = 0,
    QueueBarCrossed = 1,
    QueueTimeOut = 2,
    PreBoostedBarCrossed = 3,
    BoostedTimeOut = 4,
    BoostedBarCrossed = 5
}
export interface IProposalStaticState {
    id: string;
    dao: DAO;
    scheme: ISchemeState;
    votingMachine: Address;
}
export interface IProposalState extends IProposalStaticState {
    accountsWithUnclaimedRewards: Address[];
    boostedAt: Date;
    contributionReward: ContributionReward.IContributionReward | null;
    competition: ICompetitionProposalState | null;
    confidenceThreshold: number;
    closingAt: Date;
    createdAt: Date;
    descriptionHash?: string;
    description?: string;
    downStakeNeededToQueue: BN;
    executedAt: Date;
    executionState: IExecutionState;
    expiresInQueueAt: Date;
    genericScheme: GenericScheme.IGenericScheme | null;
    genesisProtocolParams: IGenesisProtocolParams;
    organizationId: string;
    paramsHash: string;
    preBoostedAt: Date;
    proposal: Proposal;
    proposer: Address;
    queue: IQueueState;
    quietEndingPeriodBeganAt: Date;
    schemeRegistrar: SchemeRegistrar.ISchemeRegistrar | null;
    resolvedAt: Date;
    stage: IProposalStage;
    stakesFor: BN;
    stakesAgainst: BN;
    tags?: string[];
    title?: string;
    totalRepWhenCreated: BN;
    totalRepWhenExecuted: BN;
    type: IProposalType;
    upstakeNeededToPreBoost: BN;
    url?: string;
    votesFor: BN;
    votesAgainst: BN;
    votesCount: number;
    voteOnBehalf: Address;
    winningOutcome: IProposalOutcome;
}
export declare class Proposal implements IStateful<IProposalState> {
    static fragments: {
        ProposalFields: import("graphql").DocumentNode;
    };
    /**
     * Search for proposals
     * @param  options            Search options, must implemeent IProposalQueryOptions
     * @param  context            An instance of Arc
     * @param  apolloQueryOptions [description]
     * @return                    An observable of lists of results
     *
     * For example:
     *    Proposal.search({ stage: IProposalStage.Queued})
     */
    static search(context: Arc, options?: IProposalQueryOptions, apolloQueryOptions?: IApolloQueryOptions): Observable<Proposal[]>;
    context: Arc;
    id: string;
    staticState: IProposalStaticState | undefined;
    constructor(idOrOpts: string | IProposalStaticState, context: Arc);
    setStaticState(opts: IProposalStaticState): void;
    fetchStaticState(): Promise<IProposalStaticState>;
    /**
     * `state` is an observable of the proposal state
     */
    state(apolloQueryOptions?: IApolloQueryOptions): Observable<IProposalState>;
    /**
     * @return the scheme Contract
     */
    scheme(): Promise<any>;
    /**
     * [votingMachine description]
     * @return a web3 Contract instance
     */
    votingMachine(): Promise<any>;
    /**
     * [redeemerContract description]
     * @return a web3 Contract instance
     */
    redeemerContract(): any;
    votes(options?: IVoteQueryOptions, apolloQueryOptions?: IApolloQueryOptions): Observable<Vote[]>;
    /**
     * Vote for this proposal
     * @param  outcome one of IProposalOutcome.Pass (0) or IProposalOutcome.FAIL (1)
     * @param  amount the amount of reputation to vote with. Defaults to 0 - in that case,
     *  all the sender's rep will be used
     * @return  an observable Operation<Vote>
     */
    vote(outcome: IProposalOutcome, amount?: number): Operation<Vote | null>;
    stakingToken(): import("./token").Token;
    stakes(options?: IStakeQueryOptions, apolloQueryOptions?: IApolloQueryOptions): Observable<Stake[]>;
    /**
     * Stake on this proposal
     * @param  outcome the outcome that is staked on, of type IProposalOutcome
     * @param  amount  the amount, in GEN, to stake
     * @return  An observable that can be sent, or subscribed to
     */
    stake(outcome: IProposalOutcome, amount: BN): Operation<Stake>;
    rewards(options?: IRewardQueryOptions, apolloQueryOptions?: IApolloQueryOptions): Observable<Reward[]>;
    /**
     * [claimRewards description] Execute the proposal and distribute the rewards
     * to the beneficiary.
     * This uses the Redeemer.sol helper contract
     * @param  beneficiary Addresss of the beneficiary, optional,
     *    if undefined will only redeem the ContributionReward rewards
     * @return  an Operation
     */
    claimRewards(beneficiary?: Address): Operation<boolean>;
    /**
     * calll the 'execute()' function on the votingMachine.
     * the main purpose of this function is to set the stage of the proposals
     * this call may (or may not) "execute" the proposal itself (i.e. do what the proposal proposes)
     * @return an Operation that, when sucessful, will contain the receipt of the transaction
     */
    execute(): Operation<any>;
    executeBoosted(): Operation<any>;
}
declare enum ProposalQuerySortOptions {
    resolvesAt = "resolvesAt",
    preBoostedAt = "preBoostedAt"
}
export interface IProposalQueryOptions extends ICommonQueryOptions {
    where?: {
        accountsWithUnclaimedRewards_contains?: Address[];
        active?: boolean;
        boosted?: boolean;
        dao?: Address;
        expiresInQueueAt?: Date;
        expiresInQueueAt_gte?: Date;
        expiresInQueueAt_lte?: Date;
        expiresInQueueAt_gt?: Date;
        executedAfter?: Date;
        executedBefore?: Date;
        id?: string;
        proposer?: Address;
        proposalId?: string;
        stage?: IProposalStage;
        stage_in?: IProposalStage[];
        scheme?: Address;
        orderBy?: ProposalQuerySortOptions;
        type?: IProposalType;
        [key: string]: any | undefined;
    };
}
export interface IProposalBaseCreateOptions {
    dao: Address;
    description?: string;
    descriptionHash?: string;
    title?: string;
    tags?: string[];
    scheme?: Address;
    url?: string;
    proposalType?: string;
}
export declare type IProposalCreateOptions = ((IProposalBaseCreateOptions & GenericScheme.IProposalCreateOptionsGS) | (IProposalBaseCreateOptions & SchemeRegistrar.IProposalCreateOptionsSR) | (IProposalBaseCreateOptions & ContributionReward.IProposalCreateOptionsCR) | (ContributionRewardExt.IProposalCreateOptionsContributionRewardExt) | (IProposalCreateOptionsCompetition));
export {};
