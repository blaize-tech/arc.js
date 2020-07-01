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
var utils_1 = require("./utils");
var Reward = /** @class */ (function () {
    function Reward(idOrOpts, context) {
        this.idOrOpts = idOrOpts;
        this.context = context;
        this.context = context;
        if (typeof idOrOpts === 'string') {
            this.id = idOrOpts;
        }
        else {
            this.id = idOrOpts.id;
            this.setStaticState(idOrOpts);
        }
    }
    /**
     * Reward.search(context, options) searches for reward entities
     * @param  context an Arc instance that provides connection information
     * @param  options the query options, cf. IRewardQueryOptions
     * @return         an observable of Reward objects
     */
    Reward.search = function (context, options, apolloQueryOptions) {
        if (options === void 0) { options = {}; }
        if (apolloQueryOptions === void 0) { apolloQueryOptions = {}; }
        var where = '';
        if (!options.where) {
            options.where = {};
        }
        var proposalId = options.where.proposal;
        // if we are searching for stakes on a specific proposal (a common case), we
        // will structure the query so that stakes are stored in the cache together wit the proposal
        if (proposalId) {
            delete options.where.proposal;
        }
        for (var _i = 0, _a = Object.keys(options.where); _i < _a.length; _i++) {
            var key = _a[_i];
            if (options.where[key] === undefined) {
                continue;
            }
            if (key === 'beneficiary' || key === 'dao') {
                var option = options.where[key];
                utils_1.isAddress(option);
                options.where[key] = option.toLowerCase();
            }
            where += key + ": \"" + options.where[key] + "\"\n";
        }
        var itemMap = function (item) { return new Reward({
            beneficiary: item.beneficiary,
            createdAt: item.createdAt,
            daoBountyForStaker: new BN(item.daoBountyForStaker),
            id: item.id,
            proposalId: item.proposal.id,
            reputationForProposer: new BN(item.reputationForProposer),
            reputationForVoter: new BN(item.reputationForVoter),
            tokenAddress: item.tokenAddress,
            tokensForStaker: new BN(item.tokensForStaker)
        }, context); };
        var query;
        if (proposalId) {
            query = graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["query RewardSearchFromProposal\n      {\n        proposal (id: \"", "\") {\n          id\n          gpRewards ", " {\n            ...RewardFields\n          }\n        }\n      }\n      ", "\n      "], ["query RewardSearchFromProposal\n      {\n        proposal (id: \"", "\") {\n          id\n          gpRewards ", " {\n            ...RewardFields\n          }\n        }\n      }\n      ", "\n      "])), proposalId, utils_1.createGraphQlQuery(options, where), Reward.fragments.RewardFields);
            return context.getObservableObject(query, function (r) {
                if (r === null) {
                    return [];
                }
                var rewards = r.gpRewards;
                return rewards.map(itemMap);
            }, apolloQueryOptions);
        }
        else {
            query = graphql_tag_1.default(templateObject_2 || (templateObject_2 = __makeTemplateObject(["query RewardSearch\n      {\n        gprewards ", " {\n          ...RewardFields\n        }\n      }\n      ", "\n      "], ["query RewardSearch\n      {\n        gprewards ", " {\n          ...RewardFields\n        }\n      }\n      ", "\n      "])), utils_1.createGraphQlQuery(options, where), Reward.fragments.RewardFields);
        }
        return context.getObservableList(query, itemMap, apolloQueryOptions);
    };
    Reward.prototype.state = function (apolloQueryOptions) {
        var _this = this;
        if (apolloQueryOptions === void 0) { apolloQueryOptions = {}; }
        var query = graphql_tag_1.default(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n      query RewardState {\n        gpreward (id: \"", "\")\n        {\n          ...RewardFields\n        }\n      }\n      ", "\n    "], ["\n      query RewardState {\n        gpreward (id: \"", "\")\n        {\n          ...RewardFields\n        }\n      }\n      ", "\n    "])), this.id, Reward.fragments.RewardFields);
        var itemMap = function (item) {
            _this.setStaticState({
                beneficiary: item.beneficiary,
                createdAt: item.createdAt,
                daoBountyForStaker: new BN(item.daoBountyForStaker),
                id: item.id,
                proposalId: item.proposal.id,
                reputationForProposer: new BN(item.reputationForProposer),
                reputationForVoter: new BN(item.reputationForVoter),
                tokenAddress: item.tokenAddress,
                tokensForStaker: new BN(item.tokensForStaker)
            });
            return {
                beneficiary: item.beneficiary,
                createdAt: item.createdAt,
                daoBountyForStaker: new BN(item.daoBountyForStaker),
                daoBountyForStakerRedeemedAt: Number(item.daoBountyForStakerRedeemedAt),
                id: item.id,
                proposalId: item.proposal.id,
                reputationForProposer: new BN(item.reputationForProposer),
                reputationForProposerRedeemedAt: Number(item.reputationForProposerRedeemedAt),
                reputationForVoter: new BN(item.reputationForVoter),
                reputationForVoterRedeemedAt: Number(item.reputationForVoterRedeemedAt),
                tokenAddress: item.tokenAddress,
                tokensForStaker: new BN(item.tokensForStaker),
                tokensForStakerRedeemedAt: Number(item.tokensForStakerRedeemedAt)
            };
        };
        return this.context.getObservableObject(query, itemMap, apolloQueryOptions);
    };
    Reward.prototype.setStaticState = function (opts) {
        this.staticState = opts;
    };
    Reward.prototype.fetchStaticState = function () {
        return __awaiter(this, void 0, void 0, function () {
            var state;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!!this.staticState) return [3 /*break*/, 1];
                        return [2 /*return*/, this.staticState];
                    case 1: return [4 /*yield*/, this.state({ subscribe: false }).pipe(operators_1.first()).toPromise()];
                    case 2:
                        state = _a.sent();
                        this.setStaticState(state);
                        return [2 /*return*/, state];
                }
            });
        });
    };
    Reward.fragments = {
        RewardFields: graphql_tag_1.default(templateObject_4 || (templateObject_4 = __makeTemplateObject(["fragment RewardFields on GPReward {\n      id\n      createdAt\n      dao {\n        id\n      }\n      beneficiary\n      daoBountyForStaker\n      proposal {\n         id\n      }\n      reputationForVoter\n      reputationForVoterRedeemedAt\n      reputationForProposer\n      reputationForProposerRedeemedAt\n      tokenAddress\n      tokensForStaker\n      tokensForStakerRedeemedAt\n      daoBountyForStakerRedeemedAt\n    }"], ["fragment RewardFields on GPReward {\n      id\n      createdAt\n      dao {\n        id\n      }\n      beneficiary\n      daoBountyForStaker\n      proposal {\n         id\n      }\n      reputationForVoter\n      reputationForVoterRedeemedAt\n      reputationForProposer\n      reputationForProposerRedeemedAt\n      tokenAddress\n      tokensForStaker\n      tokensForStakerRedeemedAt\n      daoBountyForStakerRedeemedAt\n    }"])))
    };
    return Reward;
}());
exports.Reward = Reward;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=reward.js.map