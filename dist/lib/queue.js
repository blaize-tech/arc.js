"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var BN = require("bn.js");
var graphql_tag_1 = require("graphql-tag");
var dao_1 = require("./dao");
var scheme_1 = require("./scheme");
var utils_1 = require("./utils");
var Queue = /** @class */ (function () {
    function Queue(id, dao, context) {
        this.id = id;
        this.dao = dao;
        this.context = context;
        this.context = context;
    }
    /**
     * Queue.search(context, options) searches for queue entities
     * @param  context an Arc instance that provides connection information
     * @param  options the query options, cf. IQueueQueryOptions
     * @return         an observable of Queue objects
     */
    Queue.search = function (context, options, apolloQueryOptions) {
        if (options === void 0) { options = {}; }
        if (apolloQueryOptions === void 0) { apolloQueryOptions = {}; }
        if (!options.where) {
            options.where = {};
        }
        var where = '';
        for (var _i = 0, _a = Object.keys(options.where); _i < _a.length; _i++) {
            var key = _a[_i];
            if (options[key] === undefined) {
                continue;
            }
            if (key === 'dao' || key === 'votingMaching' || key === 'scheme') {
                var option = options[key];
                utils_1.isAddress(option);
                options[key] = option.toLowerCase();
            }
            where += key + ": \"" + options[key] + "\"\n";
        }
        // use the following query once https://github.com/daostack/subgraph/issues/217 is resolved
        var query = graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["query QueueSearch\n      {\n        gpqueues ", " {\n          id\n          dao {\n            id\n          }\n          scheme {\n            id\n            address\n            name\n            numberOfBoostedProposals\n            numberOfPreBoostedProposals\n            numberOfQueuedProposals\n          }\n        }\n      }\n    "], ["query QueueSearch\n      {\n        gpqueues ", " {\n          id\n          dao {\n            id\n          }\n          scheme {\n            id\n            address\n            name\n            numberOfBoostedProposals\n            numberOfPreBoostedProposals\n            numberOfQueuedProposals\n          }\n        }\n      }\n    "])), utils_1.createGraphQlQuery(options, where));
        var itemMap = function (item) {
            // we must filter explictly by name as the subgraph does not return the name
            return new Queue(item.id, new dao_1.DAO(item.dao.id, context), context);
        };
        return context.getObservableList(query, itemMap, apolloQueryOptions);
    };
    Queue.prototype.state = function (apolloQueryOptions) {
        var _this = this;
        if (apolloQueryOptions === void 0) { apolloQueryOptions = {}; }
        //
        var query = graphql_tag_1.default(templateObject_2 || (templateObject_2 = __makeTemplateObject(["query QueueState\n      {\n        gpqueue (id: \"", "\") {\n          id\n          dao {\n            id\n          }\n          scheme {\n            ...SchemeFields\n          }\n          votingMachine\n          threshold\n        }\n      }\n      ", "\n    "], ["query QueueState\n      {\n        gpqueue (id: \"", "\") {\n          id\n          dao {\n            id\n          }\n          scheme {\n            ...SchemeFields\n          }\n          votingMachine\n          threshold\n        }\n      }\n      ", "\n    "])), this.id, scheme_1.Scheme.fragments.SchemeFields);
        var itemMap = function (item) {
            if (!item) {
                throw Error("No gpQueue with id " + _this.id + " was found");
            }
            var threshold = utils_1.realMathToNumber(new BN(item.threshold));
            var scheme = scheme_1.Scheme.itemMap(item.scheme, _this.context);
            return {
                dao: item.dao.id,
                id: item.id,
                name: scheme.name,
                scheme: scheme,
                threshold: threshold,
                votingMachine: item.votingMachine
            };
        };
        return this.context.getObservableObject(query, itemMap, apolloQueryOptions);
    };
    return Queue;
}());
exports.Queue = Queue;
var templateObject_1, templateObject_2;
//# sourceMappingURL=queue.js.map