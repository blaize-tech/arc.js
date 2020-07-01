import BN = require('bn.js');
import { Observable, Observer, Subscription } from 'rxjs';
import { DAO, IDAOQueryOptions } from './dao';
import { GraphNodeObserver, IApolloQueryOptions } from './graphnode';
export { IApolloQueryOptions } from './graphnode';
import { Event, IEventQueryOptions } from './event';
import { Operation, transactionErrorHandler, web3receipt } from './operation';
import { IProposalQueryOptions, Proposal } from './proposal';
import { IRewardQueryOptions, Reward } from './reward';
import { ISchemeQueryOptions, Scheme } from './scheme';
import { IStakeQueryOptions, Stake } from './stake';
import { ITagQueryOptions, Tag } from './tag';
import { Token } from './token';
import { Address, IPFSProvider, Web3Provider } from './types';
declare const Web3: any;
/**
 * The Arc class holds all configuration.
 * Any useage of the library typically will start with instantiating a new Arc instance
 * @return an instance of Arc
 */
export declare class Arc extends GraphNodeObserver {
    web3Provider: Web3Provider;
    web3ProviderRead: Web3Provider;
    ipfsProvider: IPFSProvider;
    pendingOperations: Observable<Array<Operation<any>>>;
    ipfs: any;
    web3: typeof Web3;
    web3Read: typeof Web3;
    /**
     * a mapping of contrct names to contract addresses
     */
    contractInfos: IContractInfo[];
    contracts: {
        [key: string]: any;
    };
    contractsR: {
        [key: string]: any;
    };
    blockHeaderSubscription: Subscription | undefined;
    observedAccounts: {
        [address: string]: {
            observable?: Observable<BN>;
            observer?: Observer<BN>;
            lastBalance?: string;
            subscriptionsCount: number;
        };
    };
    constructor(options: {
        /** Information about the contracts. Cf. [[setContractInfos]] and [[fetchContractInfos]] */
        contractInfos?: IContractInfo[];
        graphqlHttpProvider?: string;
        graphqlWsProvider?: string;
        ipfsProvider?: IPFSProvider;
        web3Provider?: string;
        web3ProviderRead?: string;
        /** this function will be called before a query is sent to the graphql provider */
        graphqlPrefetchHook?: (query: any) => void;
        /** determines whether a query should subscribe to updates from the graphProvider. Default is true.  */
        graphqlSubscribeToQueries?: boolean;
        /** an apollo-retry-link instance as https://www.apollographql.com/docs/link/links/retry/#default-configuration */
        graphqlRetryLink?: any;
        graphqlErrHandler?: any;
    });
    /**
     * set the contract addresses
     * @param  contractInfos a list of IContractInfo objects
     * @return
     */
    setContractInfos(contractInfos: IContractInfo[]): Promise<void>;
    /**
     * fetch contractInfos from the subgraph
     * @return a list of IContractInfo instances
     */
    fetchContractInfos(apolloQueryOptions?: IApolloQueryOptions): Promise<IContractInfo[]>;
    /**
     * get a DAO instance from an address
     * @param  address address of the dao Avatar
     * @return an instance of a DAO
     */
    dao(address: Address): DAO;
    /**
     * return an observable of the list of DAOs
     * @param options options to pass on to the query
     * @return [description]
     */
    daos(options?: IDAOQueryOptions, apolloQueryOptions?: IApolloQueryOptions): Observable<DAO[]>;
    tags(options?: ITagQueryOptions, apolloQueryOptions?: IApolloQueryOptions): Observable<Tag[]>;
    scheme(id: string): Scheme;
    schemes(options?: ISchemeQueryOptions, apolloQueryOptions?: IApolloQueryOptions): Observable<Scheme[]>;
    proposal(id: string): Proposal;
    proposals(options?: IProposalQueryOptions, apolloQueryOptions?: IApolloQueryOptions): Observable<Proposal[]>;
    events(options?: IEventQueryOptions, apolloQueryOptions?: IApolloQueryOptions): Observable<Event[]>;
    rewards(options?: IRewardQueryOptions, apolloQueryOptions?: IApolloQueryOptions): Observable<Reward[]>;
    stakes(options?: IStakeQueryOptions, apolloQueryOptions?: IApolloQueryOptions): Observable<Stake[]>;
    ethBalance(owner: Address): Observable<BN>;
    /**
     * return information about the contract
     * @param  address [description]
     * @return      an IContractInfo instance
     */
    getContractInfo(address: Address): IContractInfo;
    getContractInfoByName(name: string, version: string): IContractInfo;
    getABI(address?: Address, abiName?: string, version?: string): any;
    /**
     * return a web3 Contract instance.
     * @param  address address of the contract to look up in self.contractInfos
     * @param  [abiName] (optional) name of the ABI (i.e. 'Avatar' or 'SchemeRegistrar').
     * @param  [version] (optional) Arc version of contract (https://www.npmjs.com/package/@daostack/arc)
     * @return   a web3 contract instance
     */
    getContract(address: Address, abi?: any, mode?: 'readonly'): any;
    /**
     * get the GEN Token
     * @return a Token instance
     */
    GENToken(): Token;
    getAccount(): Observable<Address>;
    setAccount(address: Address): void;
    approveForStaking(spender: Address, amount: BN): Operation<any>;
    /**
     * How much GEN spender may spend on behalve of the owner
     * @param  owner Address of the owner of the tokens
     * @param  spender Address of the spender
     * @return
     */
    allowance(owner: Address, spender: Address): Observable<BN>;
    /**
     * send an Ethereum transaction
     * @param  transaction  [description]
     * @param  mapToObject  [description]
     * @param  errorHandler [description]
     * @return  An observable of
     */
    sendTransaction<T>(transaction: any, mapToObject: (receipt: web3receipt) => T, errorHandler?: transactionErrorHandler): Operation<T>;
    /**
     * save data of a proposal to IPFS, return  the IPFS hash
     * @param  options an Object to save. This object must have title, url and desction defined
     * @return  a Promise that resolves in the IPFS Hash where the file is saved
     */
    saveIPFSData(options: {
        title?: string;
        url?: string;
        description?: string;
        tags?: string[];
    }): Promise<string>;
}
export interface IContractAddresses {
    [key: string]: Address;
}
export interface IContractInfo {
    id: string;
    version: string;
    address: Address;
    name: string;
}
