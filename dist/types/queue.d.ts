import { Observable } from 'rxjs';
import { Arc, IApolloQueryOptions } from './arc';
import { DAO } from './dao';
import { ISchemeState } from './scheme';
import { Address, ICommonQueryOptions, IStateful } from './types';
export interface IQueueStaticState {
    dao: DAO;
    id: string;
    name: string;
}
export interface IQueueState extends IQueueStaticState {
    scheme: ISchemeState;
    threshold: number;
    votingMachine: Address;
}
export interface IQueueQueryOptions extends ICommonQueryOptions {
    where?: {
        dao?: Address;
        votingMachine?: Address;
        scheme?: Address;
        [key: string]: any;
    };
}
export declare class Queue implements IStateful<IQueueState> {
    id: string;
    dao: DAO;
    context: Arc;
    /**
     * Queue.search(context, options) searches for queue entities
     * @param  context an Arc instance that provides connection information
     * @param  options the query options, cf. IQueueQueryOptions
     * @return         an observable of Queue objects
     */
    static search(context: Arc, options?: IQueueQueryOptions, apolloQueryOptions?: IApolloQueryOptions): Observable<Queue[]>;
    constructor(id: string, dao: DAO, context: Arc);
    state(apolloQueryOptions?: IApolloQueryOptions): Observable<IQueueState>;
}
