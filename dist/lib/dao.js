"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
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
var member_1 = require("./member");
var operation_1 = require("./operation");
var proposal_1 = require("./proposal");
var reputation_1 = require("./reputation");
var reward_1 = require("./reward");
var scheme_1 = require("./scheme");
var stake_1 = require("./stake");
var token_1 = require("./token");
var utils_1 = require("./utils");
var vote_1 = require("./vote");
var DAO = /** @class */ (function () {
    function DAO(idOrOpts, context) {
        this.context = context;
        if (typeof idOrOpts === 'string') {
            this.id = idOrOpts.toLowerCase();
        }
        else {
            this.id = idOrOpts.address;
            this.setStaticState(idOrOpts);
        }
    }
    /**
     * DAO.search(context, options) searches for DAO entities
     * @param  context an Arc instance that provides connection information
     * @param  options the query options, cf. IDAOQueryOptions
     * @return         an observable of DAO objects
     */
    DAO.search = function (context, options, apolloQueryOptions) {
        if (options === void 0) { options = {}; }
        if (apolloQueryOptions === void 0) { apolloQueryOptions = {}; }
        var where = '';
        if (!options.where) {
            options.where = {};
        }
        for (var _i = 0, _a = Object.keys(options.where); _i < _a.length; _i++) {
            var key = _a[_i];
            if (options.where[key] === undefined) {
                continue;
            }
            if (key === 'address') {
                var option = options.where[key];
                utils_1.isAddress(option);
                options.where[key] = option.toLowerCase();
            }
            where += key + ": \"" + options.where[key] + "\"\n";
        }
        var query;
        if (apolloQueryOptions.fetchAllData === true) {
            query = graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["query SearchDaosWithAllData {\n        daos ", " {\n          ...DAOFields\n          }\n        }\n        ", ""], ["query SearchDaosWithAllData {\n        daos ", " {\n          ...DAOFields\n          }\n        }\n        ", ""])), utils_1.createGraphQlQuery(options, where), DAO.fragments.DAOFields);
        }
        else {
            query = graphql_tag_1.default(templateObject_2 || (templateObject_2 = __makeTemplateObject(["query SearchDaoIds {\n        daos ", " {\n          id\n        }\n      }"], ["query SearchDaoIds {\n        daos ", " {\n          id\n        }\n      }"])), utils_1.createGraphQlQuery(options, where));
        }
        return context.getObservableList(query, function (r) {
            if (apolloQueryOptions.fetchAllData) {
                var reputation = new reputation_1.Reputation(r.nativeReputation.id, context);
                var token = new token_1.Token(r.nativeToken.id, context);
                return new DAO({
                    address: r.id,
                    id: r.id,
                    name: r.name,
                    register: r.register,
                    reputation: reputation,
                    token: token,
                    tokenName: r.tokenName,
                    tokenSymbol: r.tokenSymbol
                }, context);
            }
            else {
                return new DAO(r.id, context);
            }
        }, apolloQueryOptions);
    };
    DAO.prototype.setStaticState = function (opts) {
        this.staticState = opts;
    };
    DAO.prototype.fetchStaticState = function () {
        return __awaiter(this, void 0, void 0, function () {
            var state, staticState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!!this.staticState) return [3 /*break*/, 1];
                        return [2 /*return*/, this.staticState];
                    case 1: return [4 /*yield*/, this.state().pipe(operators_1.first()).toPromise()];
                    case 2:
                        state = _a.sent();
                        staticState = {
                            address: state.address,
                            id: state.id,
                            name: state.name,
                            register: state.register,
                            reputation: state.reputation,
                            token: state.token,
                            tokenName: state.tokenName,
                            tokenSymbol: state.tokenSymbol
                        };
                        this.setStaticState(staticState);
                        return [2 /*return*/, staticState];
                }
            });
        });
    };
    /**
     * get the current state of the DAO
     * @return an Observable of IDAOState
     */
    DAO.prototype.state = function (apolloQueryOptions) {
        var _this = this;
        if (apolloQueryOptions === void 0) { apolloQueryOptions = {}; }
        var query = graphql_tag_1.default(templateObject_3 || (templateObject_3 = __makeTemplateObject(["query DAOById {\n        dao(id: \"", "\") {\n          ...DAOFields\n        }\n      }\n      ", "\n     "], ["query DAOById {\n        dao(id: \"", "\") {\n          ...DAOFields\n        }\n      }\n      ", "\n     "])), this.id, DAO.fragments.DAOFields);
        var itemMap = function (item) {
            if (item === null) {
                throw Error("Could not find a DAO with id " + _this.id);
            }
            var reputation = new reputation_1.Reputation(item.nativeReputation.id, _this.context);
            var token = new token_1.Token(item.nativeToken.id, _this.context);
            _this.setStaticState({
                address: item.id,
                id: item.id,
                name: item.name,
                register: item.register,
                reputation: reputation,
                token: token,
                tokenName: item.nativeToken.name,
                tokenSymbol: item.nativeToken.symbol
            });
            return {
                address: item.id,
                dao: _this,
                id: item.id,
                memberCount: Number(item.reputationHoldersCount),
                name: item.name,
                numberOfBoostedProposals: Number(item.numberOfBoostedProposals),
                numberOfPreBoostedProposals: Number(item.numberOfPreBoostedProposals),
                numberOfQueuedProposals: Number(item.numberOfQueuedProposals),
                register: item.register,
                reputation: reputation,
                reputationTotalSupply: new BN(item.nativeReputation.totalSupply),
                token: token,
                tokenName: item.nativeToken.name,
                tokenSymbol: item.nativeToken.symbol,
                tokenTotalSupply: item.nativeToken.totalSupply
            };
        };
        return this.context.getObservableObject(query, itemMap, apolloQueryOptions);
    };
    /*
     * return the nativeReputation of the DAO
     * @returns an (Observable) that returns a Reputation instance
     */
    DAO.prototype.nativeReputation = function () {
        return this.state().pipe(operators_1.first()).pipe(operators_1.map(function (r) { return r.reputation; }));
    };
    DAO.prototype.schemes = function (options, apolloQueryOptions) {
        if (options === void 0) { options = {}; }
        if (apolloQueryOptions === void 0) { apolloQueryOptions = {}; }
        if (!options.where) {
            options.where = {};
        }
        options.where.dao = this.id;
        return scheme_1.Scheme.search(this.context, options, apolloQueryOptions);
    };
    DAO.prototype.scheme = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var schemes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.schemes(options).pipe(operators_1.first()).toPromise()];
                    case 1:
                        schemes = _a.sent();
                        if (schemes.length === 1) {
                            return [2 /*return*/, schemes[0]];
                        }
                        else {
                            throw Error('Could not find a unique scheme satisfying these options');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    DAO.prototype.members = function (options, apolloQueryOptions) {
        if (options === void 0) { options = {}; }
        if (apolloQueryOptions === void 0) { apolloQueryOptions = {}; }
        if (!options.where) {
            options.where = {};
        }
        options.where.dao = this.id;
        return member_1.Member.search(this.context, options, apolloQueryOptions);
    };
    DAO.prototype.member = function (address) {
        if (this.staticState) {
            // construct member with the reputationcontract address, if this is known
            // so it can make use of the apollo cache
            return new member_1.Member({ address: address, contract: this.staticState.reputation.address }, this.context);
        }
        else {
            return new member_1.Member({ address: address, dao: this.id }, this.context);
        }
    };
    /**
     * create a new proposal in this DAO
     * @param  options [description]
     * @return a Proposal instance
     */
    DAO.prototype.createProposal = function (options) {
        options.dao = this.id;
        if (!options.scheme) {
            throw Error("dao.createProposal(options): options must include an address for \"scheme\"");
        }
        var schemesQuery = this.schemes({ where: {
                address: options.scheme,
                dao: options.dao
            } });
        var observable = schemesQuery.pipe(operators_1.first(), operators_1.concatMap(function (schemes) {
            if (schemes && schemes.length > 0) {
                return schemes[0].createProposal(options);
            }
            else {
                throw Error("No scheme with address " + options.scheme + " is registered with dao " + options.dao);
            }
        }));
        return operation_1.toIOperationObservable(observable);
    };
    DAO.prototype.proposals = function (options, apolloQueryOptions) {
        if (options === void 0) { options = {}; }
        if (apolloQueryOptions === void 0) { apolloQueryOptions = {}; }
        if (!options.where) {
            options.where = {};
        }
        options.where.dao = this.id;
        return proposal_1.Proposal.search(this.context, options, apolloQueryOptions);
    };
    DAO.prototype.proposal = function (proposalId) {
        return new proposal_1.Proposal(proposalId, this.context);
    };
    DAO.prototype.rewards = function (options, apolloQueryOptions) {
        if (options === void 0) { options = {}; }
        if (apolloQueryOptions === void 0) { apolloQueryOptions = {}; }
        if (!options.where) {
            options.where = {};
        }
        options.where.dao = this.id;
        return reward_1.Reward.search(this.context, options, apolloQueryOptions);
    };
    DAO.prototype.votes = function (options, apolloQueryOptions) {
        if (options === void 0) { options = {}; }
        if (apolloQueryOptions === void 0) { apolloQueryOptions = {}; }
        if (!options.where) {
            options.where = {};
        }
        options.where.dao = this.id;
        return vote_1.Vote.search(this.context, options, apolloQueryOptions);
    };
    DAO.prototype.stakes = function (options, apolloQueryOptions) {
        if (options === void 0) { options = {}; }
        if (apolloQueryOptions === void 0) { apolloQueryOptions = {}; }
        if (!options.where) {
            options.where = {};
        }
        options.where.dao = this.id;
        return stake_1.Stake.search(this.context, options, apolloQueryOptions);
    };
    /**
     * get (an observable of) the Ether balance of the DAO from the web3Provider
     *
     * @return an observable stream of BN number instances
     */
    DAO.prototype.ethBalance = function () {
        return this.context.ethBalance(this.id);
    };
    DAO.fragments = {
        DAOFields: graphql_tag_1.default(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n      fragment DAOFields on DAO {\n        id\n        name\n        nativeReputation { id, totalSupply }\n        nativeToken { id, name, symbol, totalSupply }\n        numberOfQueuedProposals\n        numberOfPreBoostedProposals\n        numberOfBoostedProposals\n        register\n        reputationHoldersCount\n    }"], ["\n      fragment DAOFields on DAO {\n        id\n        name\n        nativeReputation { id, totalSupply }\n        nativeToken { id, name, symbol, totalSupply }\n        numberOfQueuedProposals\n        numberOfPreBoostedProposals\n        numberOfBoostedProposals\n        register\n        reputationHoldersCount\n    }"])))
    };
    return DAO;
}());
exports.DAO = DAO;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=dao.js.map