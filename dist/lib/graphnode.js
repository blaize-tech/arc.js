"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_cache_inmemory_1 = require("apollo-cache-inmemory");
var apollo_client_1 = require("apollo-client");
var apollo_link_1 = require("apollo-link");
var apollo_link_error_1 = require("apollo-link-error");
var apollo_link_http_1 = require("apollo-link-http");
var apollo_link_retry_1 = require("apollo-link-retry");
var apollo_link_ws_1 = require("apollo-link-ws");
var apollo_utilities_1 = require("apollo-utilities");
var graphql_tag_1 = require("graphql-tag");
var isomorphic_fetch_1 = require("isomorphic-fetch");
var WebSocket = require("isomorphic-ws");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var logger_1 = require("./logger");
var utils_1 = require("./utils");
var subscriptions_transport_ws_1 = require("subscriptions-transport-ws");
function createApolloClient(options) {
    var httpLink = new apollo_link_http_1.HttpLink({
        credentials: 'same-origin',
        fetch: isomorphic_fetch_1.default,
        uri: options.graphqlHttpProvider
    });
    var wsLink = new apollo_link_ws_1.WebSocketLink({
        options: {
            reconnect: true
        },
        uri: options.graphqlWsProvider,
        webSocketImpl: WebSocket
    });
    var wsOrHttpLink = apollo_link_1.split(
    // split based on operation type
    function (_a) {
        var query = _a.query;
        if (options.prefetchHook) {
            options.prefetchHook(query);
        }
        var definition = apollo_utilities_1.getMainDefinition(query);
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    }, wsLink, httpLink);
    // we can also add error handling
    if (!options.retryLink) {
        options.retryLink = new apollo_link_retry_1.RetryLink({
            attempts: {
                max: 5,
                // @ts-ignore
                retryIf: function (error, operation) { return !!error; }
            },
            delay: {
                initial: 300,
                jitter: true,
                max: Infinity
            }
        });
    }
    if (!options.errHandler) {
        options.errHandler = function (event) {
            if (event.graphQLErrors) {
                event.graphQLErrors.map(function (err) {
                    return logger_1.Logger.error("[graphql error]: message: " + err.message + ", location: " + err.locations + ", path: " + err.path);
                });
            }
            if (event.networkError) {
                logger_1.Logger.error("[network error]: " + event.networkError);
            }
        };
    }
    var errorHandlingLink = apollo_link_error_1.onError(options.errHandler);
    var link = apollo_link_1.ApolloLink.from([
        errorHandlingLink,
        options.retryLink,
        wsOrHttpLink
    ]);
    var cache = new apollo_cache_inmemory_1.InMemoryCache({
        cacheRedirects: {
            Query: {
                competitionProposal: function (_, args, _a) {
                    var getCacheKey = _a.getCacheKey;
                    return getCacheKey({ __typename: 'CompetitionProposal', id: args.id });
                },
                competitionSuggestion: function (_, args, _a) {
                    var getCacheKey = _a.getCacheKey;
                    return getCacheKey({ __typename: 'CompetitionSuggestion', id: args.id });
                },
                // suggestion: (_, args, { getCacheKey }) => {
                //   return getCacheKey({ __typename: 'CompetitionSuggestion', id: args.id })
                // },
                competitionVote: function (_, args, _a) {
                    var getCacheKey = _a.getCacheKey;
                    return getCacheKey({ __typename: 'CompetitionVote', id: args.id });
                },
                controllerScheme: function (_, args, _a) {
                    var getCacheKey = _a.getCacheKey;
                    return getCacheKey({ __typename: 'ControllerScheme', id: args.id });
                },
                dao: function (_, args, _a) {
                    var getCacheKey = _a.getCacheKey;
                    return getCacheKey({ __typename: 'DAO', id: args.id });
                },
                proposal: function (_, args, _a) {
                    var getCacheKey = _a.getCacheKey;
                    return getCacheKey({ __typename: 'Proposal', id: args.id });
                },
                proposalStake: function (_, args, _a) {
                    var getCacheKey = _a.getCacheKey;
                    return getCacheKey({ __typename: 'ProposalStake', id: args.id });
                },
                proposalVote: function (_, args, _a) {
                    var getCacheKey = _a.getCacheKey;
                    return getCacheKey({ __typename: 'ProposalVote', id: args.id });
                },
                reputationHolder: function (_, args, _a) {
                    var getCacheKey = _a.getCacheKey;
                    return getCacheKey({ __typename: 'ReputationHolder', id: args.id });
                }
            }
        },
        dataIdFromObject: function (object) {
            switch (object.__typename) {
                case 'ProposalVote': return undefined;
                case 'ProposalStake': return undefined;
                // case 'CompetitionVote': return undefined
                default: return apollo_cache_inmemory_1.defaultDataIdFromObject(object); // fall back to default handling
            }
        }
    });
    var client = new apollo_client_1.ApolloClient({
        cache: cache,
        connectToDevTools: true,
        link: link
    });
    return client;
}
exports.createApolloClient = createApolloClient;
/**
 * handles connections with the Graph
 * @param options [description]
 */
var GraphNodeObserver = /** @class */ (function () {
    function GraphNodeObserver(options) {
        this.Logger = logger_1.Logger;
        this.graphqlSubscribeToQueries = (options.graphqlSubscribeToQueries === undefined || options.graphqlSubscribeToQueries);
        if (options.graphqlHttpProvider && options.graphqlWsProvider) {
            this.graphqlHttpProvider = options.graphqlHttpProvider;
            this.graphqlWsProvider = options.graphqlWsProvider;
            this.apolloClient = createApolloClient(__assign(__assign({}, options), { graphqlHttpProvider: this.graphqlHttpProvider, graphqlWsProvider: this.graphqlWsProvider }));
            this.wsclient = new subscriptions_transport_ws_1.SubscriptionClient(this.graphqlWsProvider || '', {
                reconnect: true,
            });
        }
    }
    /**
     * Given a gql query, will return an observable of query results
     * @param  query              a gql query object to execute
     * @param  apolloQueryOptions options to pass on to Apollo, cf ..
     * @return an Observable that will first yield the current result, and yields updates every time the data changes
     */
    GraphNodeObserver.prototype.getObservable = function (query, apolloQueryOptions) {
        if (apolloQueryOptions === void 0) { apolloQueryOptions = {}; }
        if (!this.apolloClient) {
            throw Error("No connection to the graph - did you set graphqlHttpProvider and graphqlWsProvider?");
        }
        var apolloClient = this.apolloClient;
        var graphqlSubscribeToQueries = this.graphqlSubscribeToQueries;
        var observable = rxjs_1.Observable.create(function (observer) {
            logger_1.Logger.debug(query.loc.source.body);
            if (!apolloQueryOptions.fetchPolicy) {
                apolloQueryOptions.fetchPolicy = 'cache-first';
            }
            var subscriptionSubscription;
            var subscribe = true;
            if (apolloQueryOptions.subscribe !== undefined) {
                subscribe = apolloQueryOptions.subscribe;
            }
            else if (graphqlSubscribeToQueries !== undefined) {
                subscribe = graphqlSubscribeToQueries;
            }
            if (subscribe) {
                // subscriptionQuery subscribes to get notified of updates to the query
                var subscriptionQuery = void 0;
                if (query.loc.source.body.trim().startsWith('query')) {
                    // remove the "query" part from the string
                    subscriptionQuery = graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n            subscription ", "\n          "], ["\n            subscription ", "\n          "])), query.loc.source.body.trim().substring('query'.length));
                }
                else {
                    subscriptionQuery = graphql_tag_1.default(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n            subscription ", "\n          "], ["\n            subscription ", "\n          "])), query);
                }
                // send a subscription request to the server
                var subscriptionObservable = apolloClient.subscribe({
                    fetchPolicy: 'cache-first',
                    // fetchPolicy: 'network-only',
                    query: subscriptionQuery
                });
                // subscribe to the results
                subscriptionSubscription = subscriptionObservable.subscribe(function (next) {
                    apolloClient.writeQuery({
                        data: next.data,
                        query: query
                    });
                });
            }
            var sub = utils_1.zenToRxjsObservable(apolloClient.watchQuery({
                fetchPolicy: apolloQueryOptions.fetchPolicy,
                fetchResults: true,
                query: query
            }))
                .pipe(operators_1.filter(function (r) {
                return !r.loading;
            }), // filter empty results
            operators_1.catchError(function (err) {
                throw Error("11. " + err.name + ": " + err.message + "\n" + query.loc.source.body);
            }))
                .subscribe(observer);
            return function () {
                if (subscriptionSubscription) {
                    subscriptionSubscription.unsubscribe();
                }
                sub.unsubscribe();
            };
        });
        observable.first = function () { return observable.pipe(operators_1.first()).toPromise(); };
        return observable;
    };
    GraphNodeObserver.prototype.lockingSgt4Reputation = function (callback) {
        this.wsclient.request({
            query: graphql_tag_1.default(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n        subscription{\n            lockingSGT4Reputations{\n              id\n              count\n              sender\n              _amount\n            }\n          }\n        "], ["\n        subscription{\n            lockingSGT4Reputations{\n              id\n              count\n              sender\n              _amount\n            }\n          }\n        "]))) // Don't forget to check for an `errors` property in the next() handler
        }).subscribe({ next: callback, error: console.error });
    };
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
    GraphNodeObserver.prototype.getObservableList = function (query, itemMap, apolloQueryOptions) {
        if (itemMap === void 0) { itemMap = function (o) { return o; }; }
        if (apolloQueryOptions === void 0) { apolloQueryOptions = {}; }
        var entity = query.definitions[0].selectionSet.selections[0].name.value;
        var observable = this.getObservable(query, apolloQueryOptions).pipe(operators_1.map(function (r) {
            if (!r.data[entity]) {
                throw Error("Could not find entity '" + entity + "' in " + Object.keys(r.data));
            }
            return r.data[entity];
        }), operators_1.map(function (rs) { return rs.map(itemMap).filter(function (x) { return x !== null; }); }));
        observable.first = function () { return observable.pipe(operators_1.first()).toPromise(); };
        return observable;
    };
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
    GraphNodeObserver.prototype.getObservableListWithFilter = function (query, itemMap, filterFunc, apolloQueryOptions) {
        if (itemMap === void 0) { itemMap = function (o) { return o; }; }
        if (apolloQueryOptions === void 0) { apolloQueryOptions = {}; }
        var entity = query.definitions[0].selectionSet.selections[0].name.value;
        return this.getObservable(query, apolloQueryOptions).pipe(operators_1.map(function (r) {
            if (!r.data[entity]) {
                throw Error("Could not find " + entity + " in " + r.data);
            }
            return r.data[entity];
        }), operators_1.filter(filterFunc), operators_1.map(function (rs) { return rs.map(itemMap); }));
    };
    GraphNodeObserver.prototype.getObservableObject = function (query, itemMap, apolloQueryOptions) {
        if (itemMap === void 0) { itemMap = function (o) { return o; }; }
        if (apolloQueryOptions === void 0) { apolloQueryOptions = {}; }
        var entity = query.definitions[0].selectionSet.selections[0].name.value;
        var observable = this.getObservable(query, apolloQueryOptions).pipe(operators_1.map(function (r) {
            if (!r.data) {
                return null;
            }
            return r.data[entity];
        }), operators_1.map(itemMap));
        observable.first = function () { return observable.pipe(operators_1.first()).toPromise(); };
        return observable;
    };
    GraphNodeObserver.prototype.sendQuery = function (query, apolloQueryOptions) {
        if (apolloQueryOptions === void 0) { apolloQueryOptions = {}; }
        if (!this.apolloClient) {
            throw Error("No connection to the graph - did you set graphqlHttpProvider and graphqlWsProvider?");
        }
        var apolloClient = this.apolloClient;
        return apolloClient.query(__assign(__assign({}, apolloQueryOptions), { query: query }));
    };
    return GraphNodeObserver;
}());
exports.GraphNodeObserver = GraphNodeObserver;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=graphnode.js.map