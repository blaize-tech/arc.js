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
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var dao_1 = require("./dao");
var operation_1 = require("./operation");
var proposal_1 = require("./proposal");
var stake_1 = require("./stake");
var utils_1 = require("./utils");
var vote_1 = require("./vote");
/**
 * Represents an account that holds reputaion in a specific DAO
 */
var Member = /** @class */ (function () {
    /**
     * @param address addresssof the member
     * @param daoAdress addresssof the DAO this member is a member of
     * @param context an instance of Arc
     */
    function Member(idOrOpts, context) {
        this.context = context;
        if (typeof idOrOpts === 'string') {
            this.id = idOrOpts;
        }
        else {
            var opts = idOrOpts;
            this.setStaticState(opts);
        }
    }
    /**
     * Member.search(context, options) searches for member entities
     * @param  context an Arc instance that provides connection information
     * @param  options the query options, cf. IMemberQueryOptions
     * @return         an observable of IRewardState objects
     */
    Member.search = function (context, options, apolloQueryOptions) {
        if (options === void 0) { options = {}; }
        if (apolloQueryOptions === void 0) { apolloQueryOptions = {}; }
        if (!options.where) {
            options.where = {};
        }
        if (options.where.id) {
            return new Member(options.where.id, context).state().pipe(operators_1.map(function (r) { return [r]; }));
        }
        else {
            var where = '';
            for (var _i = 0, _a = Object.keys(options.where); _i < _a.length; _i++) {
                var key = _a[_i];
                if (options.where[key] === undefined) {
                    continue;
                }
                if (key === 'address' || key === 'dao') {
                    var option = options.where[key];
                    utils_1.isAddress(option);
                    options.where[key] = option.toLowerCase();
                }
                where += key + ": \"" + options.where[key] + "\"\n";
            }
            where += ' dao_not: null\n';
            var query = graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n        query ReputationHolderSearch {\n          reputationHolders ", " {\n            ...ReputationHolderFields\n          }\n        }\n        ", "\n      "], ["\n        query ReputationHolderSearch {\n          reputationHolders ", " {\n            ...ReputationHolderFields\n          }\n        }\n        ", "\n      "])), utils_1.createGraphQlQuery(options, where), Member.fragments.ReputationHolderFields);
            return context.getObservableList(query, function (r) { return new Member({ id: r.id, address: r.address, dao: r.dao.id, contract: r.contract }, context); }, apolloQueryOptions);
        }
    };
    Member.prototype.fetchStaticState = function () {
        return __awaiter(this, void 0, void 0, function () {
            var state;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!!this.staticState) return [3 /*break*/, 1];
                        return [2 /*return*/, this.staticState];
                    case 1: return [4 /*yield*/, this.state().pipe(operators_1.first()).toPromise()];
                    case 2:
                        state = _a.sent();
                        return [2 /*return*/, this.setStaticState({
                                address: state.address,
                                contract: state.contract,
                                dao: state.dao,
                                id: state.id
                            })];
                }
            });
        });
    };
    Member.prototype.calculateId = function (opts) {
        var seed = utils_1.concat(utils_1.hexStringToUint8Array(opts.contract.toLowerCase()), utils_1.hexStringToUint8Array(opts.address.toLowerCase()));
        return this.context.web3.utils.keccak256(seed);
    };
    Member.prototype.setStaticState = function (opts) {
        utils_1.isAddress(opts.address);
        if (!opts.id && opts.contract && opts.address) {
            opts.id = this.calculateId({ contract: opts.contract, address: opts.address });
        }
        this.id = opts.id;
        this.staticState = {
            address: opts.address.toLowerCase(),
            contract: opts.contract && opts.contract.toLowerCase(),
            dao: opts.dao && opts.dao.toLowerCase(),
            id: opts.id
        };
        return this.staticState;
    };
    Member.prototype.state = function (apolloQueryOptions) {
        var _this = this;
        if (apolloQueryOptions === void 0) { apolloQueryOptions = {}; }
        var query;
        if (this.id) {
            query = graphql_tag_1.default(templateObject_2 || (templateObject_2 = __makeTemplateObject(["query ReputionHolderStateFromId {\n          # contract: ", "\n          # address: ", "\n          reputationHolder (\n              id: \"", "\"\n          ) {\n            ...ReputationHolderFields\n          }\n        }\n        ", "\n      "], ["query ReputionHolderStateFromId {\n          # contract: ", "\n          # address: ", "\n          reputationHolder (\n              id: \"", "\"\n          ) {\n            ...ReputationHolderFields\n          }\n        }\n        ", "\n      "])), this.staticState && this.staticState.contract, this.staticState && this.staticState.address, this.id, Member.fragments.ReputationHolderFields);
            return this.context.getObservableObject(query, function (r) {
                if (r === null || r === undefined || r.id === undefined) {
                    // we return a dummy object with 0 reputation
                    var staticState = _this.staticState;
                    if (staticState) {
                        return {
                            address: staticState.address,
                            dao: staticState.dao,
                            reputation: new BN(0)
                        };
                    }
                    else {
                        throw Error("No member with id " + _this.id + " was found");
                    }
                }
                return { id: r.id, address: r.address, dao: r.dao.id, contract: r.contract, reputation: new BN(r.balance) };
            }, apolloQueryOptions);
        }
        else {
            var staticState = this.staticState;
            query = graphql_tag_1.default(templateObject_3 || (templateObject_3 = __makeTemplateObject(["query ReputationHolderStateFromDAOAndAddress {\n          reputationHolders (\n            where: {\n              address: \"", "\"\n              dao: \"", "\"\n            }\n          ) {\n            ...ReputationHolderFields\n          }\n        }\n\n        ", "\n        "], ["query ReputationHolderStateFromDAOAndAddress {\n          reputationHolders (\n            where: {\n              address: \"", "\"\n              dao: \"", "\"\n            }\n          ) {\n            ...ReputationHolderFields\n          }\n        }\n\n        ", "\n        "])), staticState.address, staticState.dao, Member.fragments.ReputationHolderFields);
        }
        var itemMap = function (items) {
            if (items.length === 0) {
                var staticState = _this.staticState;
                return {
                    address: staticState.address,
                    dao: staticState.dao,
                    reputation: new BN(0)
                };
            }
            else {
                var item = items[0];
                return {
                    address: item.address,
                    contract: item.contract,
                    dao: item.dao.id,
                    id: item.id,
                    reputation: new BN(item.balance)
                };
            }
        };
        return this.context.getObservableObject(query, itemMap, apolloQueryOptions);
    };
    Member.prototype.dao = function () {
        return __awaiter(this, void 0, void 0, function () {
            var staticState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetchStaticState()];
                    case 1:
                        staticState = _a.sent();
                        return [2 /*return*/, new dao_1.DAO(staticState.dao, this.context)];
                }
            });
        });
    };
    Member.prototype.rewards = function () {
        throw new Error('not implemented');
    };
    Member.prototype.proposals = function (options, apolloQueryOptions) {
        var _this = this;
        if (options === void 0) { options = {}; }
        if (apolloQueryOptions === void 0) { apolloQueryOptions = {}; }
        var observable = rxjs_1.Observable.create(function (observer) { return __awaiter(_this, void 0, void 0, function () {
            var state, sub;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetchStaticState()];
                    case 1:
                        state = _a.sent();
                        if (!options.where) {
                            options.where = {};
                        }
                        options.where.proposer = state.address;
                        options.where.dao = state.dao;
                        sub = proposal_1.Proposal.search(this.context, options, apolloQueryOptions).subscribe(observer);
                        return [2 /*return*/, function () { return sub.unsubscribe(); }];
                }
            });
        }); });
        return operation_1.toIOperationObservable(observable);
    };
    Member.prototype.stakes = function (options, apolloQueryOptions) {
        var _this = this;
        if (options === void 0) { options = {}; }
        if (apolloQueryOptions === void 0) { apolloQueryOptions = {}; }
        var observable = rxjs_1.Observable.create(function (observer) { return __awaiter(_this, void 0, void 0, function () {
            var state, sub;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetchStaticState()];
                    case 1:
                        state = _a.sent();
                        if (!options.where) {
                            options.where = {};
                        }
                        options.where.staker = state.address;
                        options.where.dao = state.dao;
                        sub = stake_1.Stake.search(this.context, options, apolloQueryOptions).subscribe(observer);
                        return [2 /*return*/, function () { return sub.unsubscribe(); }];
                }
            });
        }); });
        return operation_1.toIOperationObservable(observable);
    };
    Member.prototype.votes = function (options, apolloQueryOptions) {
        var _this = this;
        if (options === void 0) { options = {}; }
        if (apolloQueryOptions === void 0) { apolloQueryOptions = {}; }
        var observable = rxjs_1.Observable.create(function (observer) { return __awaiter(_this, void 0, void 0, function () {
            var state, sub;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetchStaticState()];
                    case 1:
                        state = _a.sent();
                        if (!options.where) {
                            options.where = {};
                        }
                        options.where.voter = state.address;
                        options.where.dao = state.dao;
                        sub = vote_1.Vote.search(this.context, options, apolloQueryOptions).subscribe(observer);
                        return [2 /*return*/, function () { return sub.unsubscribe(); }];
                }
            });
        }); });
        return operation_1.toIOperationObservable(observable);
    };
    Member.fragments = {
        ReputationHolderFields: graphql_tag_1.default(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n      fragment ReputationHolderFields on ReputationHolder {\n        id\n        address\n        contract\n        dao {\n          id\n        }\n        balance\n      }\n    "], ["\n      fragment ReputationHolderFields on ReputationHolder {\n        id\n        address\n        contract\n        dao {\n          id\n        }\n        balance\n      }\n    "])))
    };
    return Member;
}());
exports.Member = Member;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=member.js.map