import { Observable } from 'rxjs';
import { Arc, IApolloQueryOptions } from './arc';
import { Address, ICommonQueryOptions, IStateful } from './types';
export interface IEventStaticState {
    id: string;
    dao: string;
    proposal: string;
    user: string;
    type: string;
    data: {
        [key: string]: any;
    };
    timestamp: string;
}
export interface IEventState extends IEventStaticState {
    id: string;
}
export interface IEventQueryOptions extends ICommonQueryOptions {
    where?: {
        id?: string;
        dao?: Address;
        proposal?: string;
        user?: Address;
        [key: string]: any;
    };
}
export declare class Event implements IStateful<IEventState> {
    idOrOpts: string | IEventStaticState;
    context: Arc;
    static fragments: {
        EventFields: import("graphql").DocumentNode;
    };
    /**
     * Event.search(context, options) searches for reward entities
     * @param  context an Arc instance that provides connection information
     * @param  options the query options, cf. IEventQueryOptions
     * @return         an observable of Event objects
     */
    static search(context: Arc, options?: IEventQueryOptions, apolloQueryOptions?: IApolloQueryOptions): Observable<Event[]>;
    id: string;
    staticState: IEventStaticState | undefined;
    constructor(idOrOpts: string | IEventStaticState, context: Arc);
    state(apolloQueryOptions?: IApolloQueryOptions): Observable<IEventState>;
    setStaticState(opts: IEventStaticState): void;
    fetchStaticState(): Promise<IEventStaticState>;
}
