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
var graphql_tag_1 = require("graphql-tag");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var operation_1 = require("../operation");
var proposal_1 = require("../proposal");
var reputationFromToken_1 = require("./reputationFromToken");
/**
 * A Scheme represents a scheme instance that is registered at a DAO
 */
var SchemeBase = /** @class */ (function () {
    function SchemeBase(idOrOpts, context) {
        this.context = context;
        this.staticState = null;
        this.ReputationFromToken = null;
        this.context = context;
        if (typeof idOrOpts === 'string') {
            this.id = idOrOpts;
            this.id = this.id.toLowerCase();
        }
        else {
            this.setStaticState(idOrOpts);
            this.id = this.staticState.id;
        }
    }
    /**
     * fetch the static state from the subgraph
     * @return the statatic state
     */
    SchemeBase.prototype.fetchStaticState = function () {
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
                        if (state === null) {
                            throw Error("No scheme with id " + this.id + " was found in the subgraph");
                        }
                        this.staticState = {
                            address: state.address,
                            dao: state.dao,
                            id: this.id,
                            name: state.name,
                            paramsHash: state.paramsHash,
                            version: state.version
                        };
                        if (this.staticState.name === 'ReputationFromToken') {
                            this.ReputationFromToken = new reputationFromToken_1.ReputationFromTokenScheme(this);
                        }
                        return [2 /*return*/, state];
                }
            });
        });
    };
    SchemeBase.prototype.setStaticState = function (opts) {
        this.staticState = opts;
    };
    /**
     * create a new proposal in this scheme
     * TODO: move this to the schemes - we should call proposal.scheme.createProposal
     * @param  options [description ]
     * @return a Proposal instance
     */
    SchemeBase.prototype.createProposalTransaction = function (options) {
        var _this = this;
        return function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, null];
        }); }); };
    };
    SchemeBase.prototype.createProposalTransactionMap = function () {
        return function (receipt) { return receipt.result; };
    };
    SchemeBase.prototype.createProposalErrorHandler = function (options) {
        return undefined;
        // return (err) => err
    };
    SchemeBase.prototype.createProposal = function (options) {
        var _this = this;
        var observable = rxjs_1.Observable.create(function (observer) { return __awaiter(_this, void 0, void 0, function () {
            var context, createTransaction, map, errHandler, sendTransactionObservable, sub;
            return __generator(this, function (_a) {
                context = this.context;
                createTransaction = this.createProposalTransaction(options);
                map = this.createProposalTransactionMap();
                errHandler = this.createProposalErrorHandler(options);
                sendTransactionObservable = context.sendTransaction(createTransaction, map, errHandler);
                sub = sendTransactionObservable.subscribe(observer);
                return [2 /*return*/, function () { return sub.unsubscribe(); }];
            });
        }); });
        return operation_1.toIOperationObservable(observable);
    };
    SchemeBase.prototype.proposals = function (options, apolloQueryOptions) {
        if (options === void 0) { options = {}; }
        if (apolloQueryOptions === void 0) { apolloQueryOptions = {}; }
        if (!options.where) {
            options.where = {};
        }
        options.where.scheme = this.id;
        return proposal_1.Proposal.search(this.context, options, apolloQueryOptions);
    };
    SchemeBase.fragments = {
        SchemeFields: graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    fragment SchemeFields on ControllerScheme {\n      id\n      address\n      name\n      dao { id }\n      canDelegateCall\n      canRegisterSchemes\n      canUpgradeController\n      canManageGlobalConstraints\n      isRegistered\n      paramsHash\n      contributionRewardParams {\n        id\n        votingMachine\n        voteParams {\n          id\n          queuedVoteRequiredPercentage\n          queuedVotePeriodLimit\n          boostedVotePeriodLimit\n          preBoostedVotePeriodLimit\n          thresholdConst\n          limitExponentValue\n          quietEndingPeriod\n          proposingRepReward\n          votersReputationLossRatio\n          minimumDaoBounty\n          daoBountyConst\n          activationTime\n          voteOnBehalf\n        }\n      }\n      contributionRewardExtParams {\n        id\n        votingMachine\n        voteParams {\n          id\n          queuedVoteRequiredPercentage\n          queuedVotePeriodLimit\n          boostedVotePeriodLimit\n          preBoostedVotePeriodLimit\n          thresholdConst\n          limitExponentValue\n          quietEndingPeriod\n          proposingRepReward\n          votersReputationLossRatio\n          minimumDaoBounty\n          daoBountyConst\n          activationTime\n          voteOnBehalf\n        }\n        rewarder\n      }\n      genericSchemeParams {\n        votingMachine\n        contractToCall\n        voteParams {\n          queuedVoteRequiredPercentage\n          queuedVotePeriodLimit\n          boostedVotePeriodLimit\n          preBoostedVotePeriodLimit\n          thresholdConst\n          limitExponentValue\n          quietEndingPeriod\n          proposingRepReward\n          votersReputationLossRatio\n          minimumDaoBounty\n          daoBountyConst\n          activationTime\n          voteOnBehalf\n        }\n      }\n      schemeRegistrarParams {\n        votingMachine\n        voteRemoveParams {\n          queuedVoteRequiredPercentage\n          queuedVotePeriodLimit\n          boostedVotePeriodLimit\n          preBoostedVotePeriodLimit\n          thresholdConst\n          limitExponentValue\n          quietEndingPeriod\n          proposingRepReward\n          votersReputationLossRatio\n          minimumDaoBounty\n          daoBountyConst\n          activationTime\n          voteOnBehalf\n        }\n        voteRegisterParams {\n          queuedVoteRequiredPercentage\n          queuedVotePeriodLimit\n          boostedVotePeriodLimit\n          preBoostedVotePeriodLimit\n          thresholdConst\n          limitExponentValue\n          quietEndingPeriod\n          proposingRepReward\n          votersReputationLossRatio\n          minimumDaoBounty\n          daoBountyConst\n          activationTime\n          voteOnBehalf\n        }\n      }\n      numberOfQueuedProposals\n      numberOfPreBoostedProposals\n      numberOfBoostedProposals\n      uGenericSchemeParams {\n        votingMachine\n        contractToCall\n        voteParams {\n          queuedVoteRequiredPercentage\n          queuedVotePeriodLimit\n          boostedVotePeriodLimit\n          preBoostedVotePeriodLimit\n          thresholdConst\n          limitExponentValue\n          quietEndingPeriod\n          proposingRepReward\n          votersReputationLossRatio\n          minimumDaoBounty\n          daoBountyConst\n          activationTime\n          voteOnBehalf\n        }\n      }\n      version\n    }"], ["\n    fragment SchemeFields on ControllerScheme {\n      id\n      address\n      name\n      dao { id }\n      canDelegateCall\n      canRegisterSchemes\n      canUpgradeController\n      canManageGlobalConstraints\n      isRegistered\n      paramsHash\n      contributionRewardParams {\n        id\n        votingMachine\n        voteParams {\n          id\n          queuedVoteRequiredPercentage\n          queuedVotePeriodLimit\n          boostedVotePeriodLimit\n          preBoostedVotePeriodLimit\n          thresholdConst\n          limitExponentValue\n          quietEndingPeriod\n          proposingRepReward\n          votersReputationLossRatio\n          minimumDaoBounty\n          daoBountyConst\n          activationTime\n          voteOnBehalf\n        }\n      }\n      contributionRewardExtParams {\n        id\n        votingMachine\n        voteParams {\n          id\n          queuedVoteRequiredPercentage\n          queuedVotePeriodLimit\n          boostedVotePeriodLimit\n          preBoostedVotePeriodLimit\n          thresholdConst\n          limitExponentValue\n          quietEndingPeriod\n          proposingRepReward\n          votersReputationLossRatio\n          minimumDaoBounty\n          daoBountyConst\n          activationTime\n          voteOnBehalf\n        }\n        rewarder\n      }\n      genericSchemeParams {\n        votingMachine\n        contractToCall\n        voteParams {\n          queuedVoteRequiredPercentage\n          queuedVotePeriodLimit\n          boostedVotePeriodLimit\n          preBoostedVotePeriodLimit\n          thresholdConst\n          limitExponentValue\n          quietEndingPeriod\n          proposingRepReward\n          votersReputationLossRatio\n          minimumDaoBounty\n          daoBountyConst\n          activationTime\n          voteOnBehalf\n        }\n      }\n      schemeRegistrarParams {\n        votingMachine\n        voteRemoveParams {\n          queuedVoteRequiredPercentage\n          queuedVotePeriodLimit\n          boostedVotePeriodLimit\n          preBoostedVotePeriodLimit\n          thresholdConst\n          limitExponentValue\n          quietEndingPeriod\n          proposingRepReward\n          votersReputationLossRatio\n          minimumDaoBounty\n          daoBountyConst\n          activationTime\n          voteOnBehalf\n        }\n        voteRegisterParams {\n          queuedVoteRequiredPercentage\n          queuedVotePeriodLimit\n          boostedVotePeriodLimit\n          preBoostedVotePeriodLimit\n          thresholdConst\n          limitExponentValue\n          quietEndingPeriod\n          proposingRepReward\n          votersReputationLossRatio\n          minimumDaoBounty\n          daoBountyConst\n          activationTime\n          voteOnBehalf\n        }\n      }\n      numberOfQueuedProposals\n      numberOfPreBoostedProposals\n      numberOfBoostedProposals\n      uGenericSchemeParams {\n        votingMachine\n        contractToCall\n        voteParams {\n          queuedVoteRequiredPercentage\n          queuedVotePeriodLimit\n          boostedVotePeriodLimit\n          preBoostedVotePeriodLimit\n          thresholdConst\n          limitExponentValue\n          quietEndingPeriod\n          proposingRepReward\n          votersReputationLossRatio\n          minimumDaoBounty\n          daoBountyConst\n          activationTime\n          voteOnBehalf\n        }\n      }\n      version\n    }"])))
    };
    return SchemeBase;
}());
exports.SchemeBase = SchemeBase;
var templateObject_1;
//# sourceMappingURL=base.js.map