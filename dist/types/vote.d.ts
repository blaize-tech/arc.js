import BN = require('bn.js');
import { Observable } from 'rxjs';
import { Arc, IApolloQueryOptions } from './arc';
import { IProposalOutcome } from './proposal';
import { Address, Date, ICommonQueryOptions, IStateful } from './types';
export interface IVoteStaticState {
    id?: string;
    voter: Address;
    createdAt: Date | undefined;
    outcome: IProposalOutcome;
    amount: BN;
    proposal: string;
    dao?: Address;
}
export interface IVoteState extends IVoteStaticState {
    id: string;
}
export interface IVoteQueryOptions extends ICommonQueryOptions {
    where?: {
        id?: string;
        voter?: Address;
        outcome?: IProposalOutcome;
        proposal?: string;
        dao?: Address;
        [key: string]: any;
    };
}
export declare class Vote implements IStateful<IVoteState> {
    context: Arc;
    static fragments: {
        VoteFields: import("graphql").DocumentNode;
    };
    /**
     * Vote.search(context, options) searches for vote entities
     * @param  context an Arc instance that provides connection information
     * @param  options the query options, cf. IVoteQueryOptions
     * @return         an observable of Vote objects
     */
    static search(context: Arc, options?: IVoteQueryOptions, apolloQueryOptions?: IApolloQueryOptions): Observable<Vote[]>;
    id: string | undefined;
    staticState: IVoteStaticState | undefined;
    constructor(idOrOpts: string | IVoteStaticState, context: Arc);
    state(apolloQueryOptions?: IApolloQueryOptions): Observable<IVoteState>;
    setStaticState(opts: IVoteStaticState): void;
    fetchStaticState(): Promise<IVoteStaticState>;
}
