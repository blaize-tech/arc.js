import { Observable } from 'rxjs';
import { Arc, IApolloQueryOptions } from './arc';
import { Operation } from './operation';
import { IProposalCreateOptions, IProposalQueryOptions, Proposal } from './proposal';
import { ISchemeQueryOptions, ISchemeState, ISchemeStaticState, SchemeBase } from './schemes/base';
import { CompetitionScheme } from './schemes/competition';
import { ReputationFromTokenScheme } from './schemes/reputationFromToken';
import { Address } from './types';
export { ISchemeQueryOptions, ISchemeState, ISchemeStaticState } from './schemes/base';
/**
 * A Scheme represents a scheme instance that is registered at a DAO
 */
export declare class Scheme extends SchemeBase {
    context: Arc;
    /**
     * Scheme.search(context, options) searches for scheme entities
     * @param  context an Arc instance that provides connection information
     * @param  options the query options, cf. ISchemeQueryOptions
     * @return         an observable of Scheme objects
     */
    static search(context: Arc, options?: ISchemeQueryOptions, apolloQueryOptions?: IApolloQueryOptions): Observable<Array<Scheme | CompetitionScheme>>;
    /**
     * map an apollo query result to ISchemeState
     *
     * @static
     * @param {*} item
     * @param {Arc} arc
     * @returns {(ISchemeState|null)}
     * @memberof Scheme
     */
    static itemMap(item: any, arc: Arc): ISchemeState | null;
    id: Address;
    staticState: ISchemeStaticState | null;
    ReputationFromToken: ReputationFromTokenScheme | null;
    constructor(idOrOpts: Address | ISchemeStaticState, context: Arc);
    setStaticState(opts: ISchemeStaticState): void;
    /**
     * fetch the static state from the subgraph
     * @return the statatic state
     */
    fetchStaticState(): Promise<ISchemeStaticState>;
    state(apolloQueryOptions?: IApolloQueryOptions): Observable<ISchemeState>;
    /**
     * create a new proposal in this Scheme
     * @param  options [description ]
     * @return a Proposal instance
     */
    createProposal(options: IProposalCreateOptions): Operation<Proposal>;
    proposals(options?: IProposalQueryOptions, apolloQueryOptions?: IApolloQueryOptions): Observable<Proposal[]>;
}
