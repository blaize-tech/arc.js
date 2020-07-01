import BN = require('bn.js');
import { Observable } from 'rxjs';
import { Arc } from '../arc';
import { IApolloQueryOptions } from '../graphnode';
import { Operation } from '../operation';
import { IProposalBaseCreateOptions, IProposalQueryOptions, Proposal } from '../proposal';
import { Address, ICommonQueryOptions, IStateful } from '../types';
import { IVoteQueryOptions } from '../vote';
import { ISchemeState, SchemeBase } from './base';
export interface ICompetitionProposalState {
    id: string;
    admin: Address;
    contract: Address;
    endTime: Date;
    numberOfWinners: number;
    rewardSplit: number[];
    startTime: Date;
    votingStartTime: Date;
    suggestionsEndTime: Date;
    numberOfVotesPerVoter: number;
    snapshotBlock: number;
    createdAt: Date;
    totalVotes: number;
    totalSuggestions: number;
    numberOfWinningSuggestions: number;
}
export interface IProposalCreateOptionsCompetition extends IProposalBaseCreateOptions {
    endTime: Date;
    reputationReward?: BN;
    ethReward?: BN;
    externalTokenReward?: BN;
    externalTokenAddress?: Address;
    rewardSplit: number[];
    nativeTokenReward?: BN;
    numberOfVotesPerVoter: number;
    proposerIsAdmin?: boolean;
    startTime: Date | null;
    suggestionsEndTime: Date;
    votingStartTime: Date;
}
export interface ICompetitionSuggestionState {
    id: string;
    suggestionId: number;
    proposal: string;
    descriptionHash: string;
    title?: string;
    description?: string;
    url?: string;
    suggester: Address;
    beneficiary: Address;
    tags: string[];
    totalVotes: BN;
    createdAt: Date;
    redeemedAt: Date | null;
    rewardPercentage: number;
    positionInWinnerList: number | null;
    isWinner: boolean;
}
export interface ICompetitionVoteState {
    id?: string;
    proposal: string;
    suggestion: string;
    voter: Address;
    createdAt?: Date;
    reputation: BN;
}
export declare class CompetitionScheme extends SchemeBase {
    state(apolloQueryOptions?: IApolloQueryOptions): Observable<ISchemeState>;
    /**
     * Return a list of competitions in this scheme.
     * @param options
     * @param apolloQueryOptions
     */
    competitions(options?: IProposalQueryOptions, apolloQueryOptions?: IApolloQueryOptions): Observable<Competition[]>;
    /**
     *
     * @param options
     * @param context
     */
    createProposalTransaction(options: IProposalCreateOptionsCompetition): () => Promise<any>;
    createProposalTransactionMap(): (receipt: any) => Proposal;
    createProposalErrorHandler(options: any): (err: Error) => Error | Promise<Error>;
    /**
     * create a proposal for starting a Competition
     *
     * @param {IProposalCreateOptionsCompetition} options
     * @returns {Operation<Proposal>}
     * @memberof CompetitionScheme
     */
    createProposal(options: IProposalCreateOptionsCompetition): Operation<Proposal>;
    getCompetitionContract(): Promise<any>;
    /**
     * Vote for the suggestion that is, in the current scheme, identified by  suggestionId
     *
     * @param {{
     *     suggestionId: number // this is the suggestion COUNTER
     *   }} options
     * @returns {Operation<CompetitionVote>}
     * @memberof CompetitionScheme
     */
    voteSuggestion(options: {
        suggestionId: number;
    }): Operation<CompetitionVote>;
    redeemSuggestion(options: {
        suggestionId: number;
    }): Operation<boolean>;
}
export declare class Competition {
    static search(context: Arc, options?: IProposalQueryOptions, apolloQueryOptions?: IApolloQueryOptions): Observable<Competition[]>;
    id: string;
    context: Arc;
    constructor(id: string, context: Arc);
    createSuggestion(options: {
        title: string;
        description: string;
        beneficiary?: Address;
        tags?: string[];
        url?: string;
    }): Operation<any>;
    voteSuggestion(suggestionId: number): Operation<CompetitionVote>;
    redeemSuggestion(suggestionId: number): Operation<boolean>;
    suggestions(options?: ICompetitionSuggestionQueryOptions, apolloQueryOptions?: IApolloQueryOptions): Observable<CompetitionSuggestion[]>;
    votes(options?: IVoteQueryOptions, apolloQueryOptions?: IApolloQueryOptions): Observable<CompetitionVote[]>;
}
export interface ICompetitionSuggestionQueryOptions extends ICommonQueryOptions {
    where?: {
        id?: string;
        proposal?: string;
        suggestionId?: number;
        positionInWinnerList?: number | null;
        positionInWinnerList_not?: number | null;
    };
}
export declare class CompetitionSuggestion implements IStateful<ICompetitionSuggestionState> {
    context: Arc;
    static fragments: {
        CompetitionSuggestionFields: import("graphql").DocumentNode;
    };
    static calculateId(opts: {
        scheme: Address;
        suggestionId: number;
    }): string;
    static search(context: Arc, options?: ICompetitionSuggestionQueryOptions, apolloQueryOptions?: IApolloQueryOptions): Observable<CompetitionSuggestion[]>;
    private static mapItemToObject;
    id: string;
    suggestionId?: number;
    staticState?: ICompetitionSuggestionState;
    constructor(idOrOpts: string | {
        suggestionId: number;
        scheme: string;
    } | ICompetitionSuggestionState, context: Arc);
    setStaticState(opts: ICompetitionSuggestionState): void;
    fetchStaticState(): Promise<ICompetitionSuggestionState>;
    state(apolloQueryOptions?: IApolloQueryOptions): Observable<ICompetitionSuggestionState>;
    vote(): Operation<CompetitionVote>;
    votes(options?: ICompetitionVoteQueryOptions, apolloQueryOptions?: IApolloQueryOptions): Observable<CompetitionVote[]>;
    getPosition(): Promise<number | null>;
    isWinner(): Promise<boolean>;
    redeem(): Operation<boolean>;
}
export interface ICompetitionVoteQueryOptions extends ICommonQueryOptions {
    where?: {
        id?: string;
        suggestion?: string;
        voter?: Address;
        proposal?: string;
        proposal_not?: string | null;
    };
}
export declare class CompetitionVote implements IStateful<ICompetitionVoteState> {
    context: Arc;
    static fragments: {
        CompetitionVoteFields: import("graphql").DocumentNode;
    };
    static search(context: Arc, options?: ICompetitionVoteQueryOptions, apolloQueryOptions?: IApolloQueryOptions): Observable<CompetitionVote[]>;
    static itemMap(item: any): {
        createdAt: Date;
        id: any;
        proposal: any;
        reputation: any;
        suggestion: any;
        voter: any;
    };
    id?: string;
    staticState?: ICompetitionVoteState;
    constructor(idOrOpts: string | ICompetitionVoteState, context: Arc);
    setStaticState(opts: ICompetitionVoteState): void;
    state(apolloQueryOptions?: IApolloQueryOptions): Observable<ICompetitionVoteState>;
}
/**
 * If this scheme is a ContributionREwardExt scheme and if
 * its rewarder is Competition contract, return that contract
 * @param schemeState
 * @returns A Web3 contract instance
 */
export declare function getCompetitionContract(schemeState: ISchemeState, arc: Arc): any;
export declare function isCompetitionScheme(arc: Arc, item: any): boolean;
/**
 * @returns true if this is a ContributionRewardExt scheme and the rewarder of this scheme is a competition contract
 */
export declare function hasCompetitionContract(schemeState: ISchemeState, arc: Arc): boolean;
