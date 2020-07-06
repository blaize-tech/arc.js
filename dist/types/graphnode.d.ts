import { ApolloClient, ApolloQueryResult } from 'apollo-client';
import { Observable } from 'rxjs';
export interface IApolloQueryOptions {
    fetchPolicy?: 'cache-first' | 'network-only' | 'cache-only' | 'no-cache' | 'standby';
    subscribe?: true | false;
    fetchAllData?: true | false;
}
export interface IObservable<T> extends Observable<T> {
    first: () => T;
}
export declare function createApolloClient(options: {
    graphqlHttpProvider: string;
    graphqlWsProvider: string;
    prefetchHook?: (query: any) => any;
    errHandler?: (event: any) => any;
    retryLink?: any;
}): ApolloClient<import("apollo-cache-inmemory").NormalizedCacheObject>;
/**
 * handles connections with the Graph
 * @param options [description]
 */
export declare class GraphNodeObserver {
    graphqlHttpProvider?: string;
    graphqlWsProvider?: string;
    Logger: import("js-logger/src/types").GlobalLogger;
    apolloClient?: ApolloClient<object>;
    graphqlSubscribeToQueries?: boolean;
    constructor(options: {
        graphqlHttpProvider?: string;
        graphqlWsProvider?: string;
        graphqlSubscribeToQueries?: boolean;
        prefetchHook?: any;
        errHandler?: any;
        retryLink?: any;
    });
    /**
     * Given a gql query, will return an observable of query results
     * @param  query              a gql query object to execute
     * @param  apolloQueryOptions options to pass on to Apollo, cf ..
     * @return an Observable that will first yield the current result, and yields updates every time the data changes
     */
    getObservable(query: any, apolloQueryOptions?: IApolloQueryOptions): any;
    lockingSgt4Reputation(callback: any): void;
    /**
     * Returns an observable that:
     * - sends a query over http and returns the current list of results
     * - subscribes over a websocket to changes, and returns the updated list.
     *
     * @param query The query to be run
     * @param  entity  name of the graphql entity to be queried.
     * @param  itemMap (optional) a function that takes elements of the list and creates new objects
     * @return an Observable
     * @example:
     * ```
     *    const query = gql`
     *    {
     *      daos {
     *        id
     *        address
     *      }
     *    }`
     *    getObservableList(query, (r:any) => new DAO(r.address))
     * ```
     */
    getObservableList(query: any, itemMap?: (o: object) => object | null, apolloQueryOptions?: IApolloQueryOptions): any;
    /**
     * Returns an observable that:
     * - sends a query over http and returns the current list of results
     * - subscribes over a websocket to changes, and returns the updated list
     * example:
     *    const query = gql`
     *    {
     *      daos {
     *        id
     *        address
     *      }
     *    }`
     *    getObservableList(query, (r:any) => new DAO(r.address), filter((r:any) => r.address === "0x1234..."))
     *
     * @param query The query to be run
     * @param  entity  name of the graphql entity to be queried.
     * @param  itemMap (optional) a function that takes elements of the list and creates new objects
     * @param filter filter the results
     * @return
     */
    getObservableListWithFilter(query: any, itemMap: ((o: object) => object | null) | undefined, filterFunc: (o: object) => boolean, apolloQueryOptions?: IApolloQueryOptions): any;
    getObservableObject(query: any, itemMap?: (o: object) => object | null, apolloQueryOptions?: IApolloQueryOptions): any;
    sendQuery(query: any, apolloQueryOptions?: IApolloQueryOptions): Promise<ApolloQueryResult<any>>;
}
