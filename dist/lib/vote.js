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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var BN = require("bn.js");
var graphql_tag_1 = require("graphql-tag");
var operators_1 = require("rxjs/operators");
var proposal_1 = require("./proposal");
var utils_1 = require("./utils");
var Vote = /** @class */ (function () {
    function Vote(idOrOpts, context) {
        this.context = context;
        if (typeof idOrOpts === 'string') {
            this.id = idOrOpts;
        }
        else {
            var opts = idOrOpts;
            this.id = opts.id;
            this.setStaticState(opts);
        }
    }
    /**
     * Vote.search(context, options) searches for vote entities
     * @param  context an Arc instance that provides connection information
     * @param  options the query options, cf. IVoteQueryOptions
     * @return         an observable of Vote objects
     */
    Vote.search = function (context, options, apolloQueryOptions) {
        if (options === void 0) { options = {}; }
        if (apolloQueryOptions === void 0) { apolloQueryOptions = {}; }
        if (!options.where) {
            options.where = {};
        }
        var proposalId = options.where.proposal;
        // if we are searching for votes of a specific proposal (a common case), we
        // will structure the query so that votes are stored in the cache together wit the proposal
        if (proposalId) {
            delete options.where.proposal;
        }
        var where = '';
        for (var _i = 0, _a = Object.keys(options.where); _i < _a.length; _i++) {
            var key = _a[_i];
            if (options.where[key] === undefined) {
                continue;
            }
            if (key === 'voter' || key === 'dao') {
                var option = options.where[key];
                utils_1.isAddress(option);
                options.where[key] = option.toLowerCase();
            }
            if (key === 'outcome') {
                where += key + ": \"" + proposal_1.IProposalOutcome[options.where[key]] + "\"\n";
            }
            else {
                where += key + ": \"" + options.where[key] + "\"\n";
            }
        }
        var query;
        var itemMap = function (r) {
            var outcome = proposal_1.IProposalOutcome.Pass;
            if (r.outcome === 'Pass') {
                outcome = proposal_1.IProposalOutcome.Pass;
            }
            else if (r.outcome === 'Fail') {
                outcome = proposal_1.IProposalOutcome.Fail;
            }
            else {
                throw new Error("Unexpected value for proposalVote.outcome: " + r.outcome);
            }
            return new Vote({
                amount: new BN(r.reputation || 0),
                createdAt: r.createdAt,
                dao: r.dao.id,
                id: r.id,
                outcome: outcome,
                proposal: r.proposal.id,
                voter: r.voter
            }, context);
        };
        // if we are searching for votes of a specific proposal (a common case), we
        // will structure the query so that votes are stored in the cache together with the proposal
        // if (options.where.proposal && !options.where.id) {
        if (proposalId && !options.where.id) {
            query = graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["query ProposalVotesSearchFromProposal\n        {\n          proposal (id: \"", "\") {\n            id\n            votes ", " {\n              ...VoteFields\n            }\n          }\n        }\n        ", "\n      "], ["query ProposalVotesSearchFromProposal\n        {\n          proposal (id: \"", "\") {\n            id\n            votes ", " {\n              ...VoteFields\n            }\n          }\n        }\n        ", "\n      "])), proposalId, utils_1.createGraphQlQuery({ where: __assign(__assign({}, options.where), { proposal: undefined }) }, where), Vote.fragments.VoteFields);
            return context.getObservableObject(query, function (r) {
                if (r === null) { // no such proposal was found
                    return [];
                }
                var votes = r.votes;
                return votes.map(itemMap);
            }, apolloQueryOptions);
        }
        else {
            query = graphql_tag_1.default(templateObject_2 || (templateObject_2 = __makeTemplateObject(["query ProposalVotesSearch\n        {\n          proposalVotes ", " {\n            ...VoteFields\n          }\n        }\n        ", "\n      "], ["query ProposalVotesSearch\n        {\n          proposalVotes ", " {\n            ...VoteFields\n          }\n        }\n        ", "\n      "])), utils_1.createGraphQlQuery(options, where), Vote.fragments.VoteFields);
            return context.getObservableList(query, itemMap, apolloQueryOptions);
        }
    };
    Vote.prototype.state = function (apolloQueryOptions) {
        var _this = this;
        if (apolloQueryOptions === void 0) { apolloQueryOptions = {}; }
        var query = graphql_tag_1.default(templateObject_3 || (templateObject_3 = __makeTemplateObject(["query ProposalVoteById {\n      proposalVote (id: \"", "\") {\n        ...VoteFields\n      }\n    }\n    ", "\n    "], ["query ProposalVoteById {\n      proposalVote (id: \"", "\") {\n        ...VoteFields\n      }\n    }\n    ", "\n    "])), this.id, Vote.fragments.VoteFields);
        var itemMap = function (item) {
            if (item === null) {
                throw Error("Could not find a Vote with id " + _this.id);
            }
            return {
                amount: item.reputation,
                createdAt: item.createdAt,
                dao: item.dao.id,
                id: item.id,
                outcome: item.outcome,
                proposal: item.proposal.id,
                voter: item.voter
            };
        };
        return this.context.getObservableObject(query, itemMap, apolloQueryOptions);
    };
    Vote.prototype.setStaticState = function (opts) {
        this.staticState = opts;
    };
    Vote.prototype.fetchStaticState = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!!this.staticState) return [3 /*break*/, 1];
                        return [2 /*return*/, this.staticState];
                    case 1: return [4 /*yield*/, this.state().pipe(operators_1.first()).toPromise()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Vote.fragments = {
        VoteFields: graphql_tag_1.default(templateObject_4 || (templateObject_4 = __makeTemplateObject(["fragment VoteFields on ProposalVote {\n      id\n      createdAt\n      dao {\n        id\n      }\n      voter\n      proposal {\n        id\n      }\n      outcome\n      reputation\n    }"], ["fragment VoteFields on ProposalVote {\n      id\n      createdAt\n      dao {\n        id\n      }\n      voter\n      proposal {\n        id\n      }\n      outcome\n      reputation\n    }"])))
    };
    return Vote;
}());
exports.Vote = Vote;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=vote.js.map