import { Observable } from 'rxjs';
import { Arc, IApolloQueryOptions } from '../arc';
import { IGenesisProtocolParams } from '../genesisProtocol';
import { Operation } from '../operation';
import { IProposalCreateOptions, IProposalQueryOptions, Proposal } from '../proposal';
import { Address, ICommonQueryOptions, IStateful } from '../types';
import { ReputationFromTokenScheme } from './reputationFromToken';
export interface ISchemeStaticState {
    id: string;
    address: Address;
    dao: Address;
    name: string;
    paramsHash: string;
    version: string;
}
export interface ISchemeState extends ISchemeStaticState {
    canDelegateCall: boolean;
    canRegisterSchemes: boolean;
    canUpgradeController: boolean;
    canManageGlobalConstraints: boolean;
    dao: Address;
    isRegistered: boolean;
    paramsHash: string;
    contributionRewardParams?: IContributionRewardParams;
    contributionRewardExtParams?: IContributionRewardExtParams;
    genericSchemeParams?: IGenericSchemeParams;
    schemeRegistrarParams?: {
        votingMachine: Address;
        voteRemoveParams: IGenesisProtocolParams;
        voteRegisterParams: IGenesisProtocolParams;
    } | null;
    numberOfQueuedProposals: number;
    numberOfPreBoostedProposals: number;
    numberOfBoostedProposals: number;
    uGenericSchemeParams?: IGenericSchemeParams;
    schemeParams?: IGenericSchemeParams | IContributionRewardParams | IContributionRewardExtParams | ISchemeRegisterParams;
}
export interface IGenericSchemeParams {
    votingMachine: Address;
    contractToCall: Address;
    voteParams: IGenesisProtocolParams;
}
export interface IContributionRewardParams {
    votingMachine: Address;
    voteParams: IGenesisProtocolParams;
}
export interface IContributionRewardExtParams {
    votingMachine: Address;
    voteParams: IGenesisProtocolParams;
    rewarder: Address;
}
export interface ISchemeRegisterParams {
    votingMachine: Address;
    contractToCall: Address;
    voteParams: IGenesisProtocolParams;
}
export interface ISchemeQueryOptions extends ICommonQueryOptions {
    where?: {
        address?: Address;
        canDelegateCall?: boolean;
        canRegisterSchemes?: boolean;
        canUpgradeController?: boolean;
        canManageGlobalConstraints?: boolean;
        dao?: Address;
        id?: string;
        isRegistered?: boolean;
        name?: string;
        paramsHash?: string;
        [key: string]: any;
    };
}
/**
 * A Scheme represents a scheme instance that is registered at a DAO
 */
export declare abstract class SchemeBase implements IStateful<ISchemeState> {
    context: Arc;
    static fragments: {
        SchemeFields: import("graphql").DocumentNode;
    };
    id: Address;
    staticState: ISchemeStaticState | null;
    ReputationFromToken: ReputationFromTokenScheme | null;
    constructor(idOrOpts: Address | ISchemeStaticState, context: Arc);
    /**
     * fetch the static state from the subgraph
     * @return the statatic state
     */
    fetchStaticState(): Promise<ISchemeStaticState>;
    setStaticState(opts: ISchemeStaticState): void;
    /**
     * create a new proposal in this scheme
     * TODO: move this to the schemes - we should call proposal.scheme.createProposal
     * @param  options [description ]
     * @return a Proposal instance
     */
    createProposalTransaction(options: any): () => Promise<any>;
    createProposalTransactionMap(): (receipt: any) => any;
    createProposalErrorHandler(options?: any): ((err: Error) => Error | Promise<Error>) | undefined;
    createProposal(options: IProposalCreateOptions): Operation<Proposal>;
    abstract state(apolloQueryOptions: IApolloQueryOptions): Observable<ISchemeState>;
    proposals(options?: IProposalQueryOptions, apolloQueryOptions?: IApolloQueryOptions): Observable<Proposal[]>;
}
