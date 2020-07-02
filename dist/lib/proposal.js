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
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var dao_1 = require("./dao");
var genesisProtocol_1 = require("./genesisProtocol");
var operation_1 = require("./operation");
var reward_1 = require("./reward");
var scheme_1 = require("./scheme");
var ContributionReward = require("./schemes/contributionReward");
var GenericScheme = require("./schemes/genericScheme");
var SchemeRegistrar = require("./schemes/schemeRegistrar");
var settings_1 = require("./settings");
var stake_1 = require("./stake");
var utils_1 = require("./utils");
var vote_1 = require("./vote");
exports.IProposalType = __assign(__assign(__assign({}, ContributionReward.IProposalType), GenericScheme.IProposalType), SchemeRegistrar.IProposalType);
var IProposalOutcome;
(function (IProposalOutcome) {
    IProposalOutcome[IProposalOutcome["None"] = 0] = "None";
    IProposalOutcome[IProposalOutcome["Pass"] = 1] = "Pass";
    IProposalOutcome[IProposalOutcome["Fail"] = 2] = "Fail";
})(IProposalOutcome = exports.IProposalOutcome || (exports.IProposalOutcome = {}));
var IProposalStage;
(function (IProposalStage) {
    IProposalStage[IProposalStage["ExpiredInQueue"] = 0] = "ExpiredInQueue";
    IProposalStage[IProposalStage["Executed"] = 1] = "Executed";
    IProposalStage[IProposalStage["Queued"] = 2] = "Queued";
    IProposalStage[IProposalStage["PreBoosted"] = 3] = "PreBoosted";
    IProposalStage[IProposalStage["Boosted"] = 4] = "Boosted";
    IProposalStage[IProposalStage["QuietEndingPeriod"] = 5] = "QuietEndingPeriod";
})(IProposalStage = exports.IProposalStage || (exports.IProposalStage = {}));
var IExecutionState;
(function (IExecutionState) {
    IExecutionState[IExecutionState["None"] = 0] = "None";
    IExecutionState[IExecutionState["QueueBarCrossed"] = 1] = "QueueBarCrossed";
    IExecutionState[IExecutionState["QueueTimeOut"] = 2] = "QueueTimeOut";
    IExecutionState[IExecutionState["PreBoostedBarCrossed"] = 3] = "PreBoostedBarCrossed";
    IExecutionState[IExecutionState["BoostedTimeOut"] = 4] = "BoostedTimeOut";
    IExecutionState[IExecutionState["BoostedBarCrossed"] = 5] = "BoostedBarCrossed";
})(IExecutionState = exports.IExecutionState || (exports.IExecutionState = {}));
var Proposal = /** @class */ (function () {
    function Proposal(idOrOpts, context) {
        if (typeof idOrOpts === 'string') {
            this.id = idOrOpts;
        }
        else {
            this.id = idOrOpts.id;
            this.setStaticState(idOrOpts);
        }
        this.context = context;
    }
    /**
     * Search for proposals
     * @param  options            Search options, must implemeent IProposalQueryOptions
     * @param  context            An instance of Arc
     * @param  apolloQueryOptions [description]
     * @return                    An observable of lists of results
     *
     * For example:
     *    Proposal.search({ stage: IProposalStage.Queued})
     */
    Proposal.search = function (context, options, apolloQueryOptions) {
        if (options === void 0) { options = {}; }
        if (apolloQueryOptions === void 0) { apolloQueryOptions = {}; }
        var where = '';
        if (!options.where) {
            options.where = {};
        }
        for (var _i = 0, _a = Object.keys(options.where); _i < _a.length; _i++) {
            var key = _a[_i];
            var value = options.where[key];
            if (key === 'stage' && value !== undefined) {
                where += "stage: \"" + IProposalStage[value] + "\"\n";
            }
            else if (key === 'stage_in' && Array.isArray(value)) {
                var stageValues = value.map(function (stage) { return '"' + IProposalStage[stage] + '"'; });
                where += "stage_in: [" + stageValues.join(',') + "]\n";
            }
            else if (key === 'type') {
                // TODO: we are not distinguishing between the schemeregisterpropose
                // and SchemeRegistrarProposeToRemove proposals
                if (value.toString().includes('SchemeRegistrar')) {
                    where += "schemeRegistrar_not: null\n";
                }
                else {
                    if (exports.IProposalType[value] === undefined) {
                        throw Error("Unknown value for \"type\" in proposals query: " + value);
                    }
                    var apolloKey = exports.IProposalType[value][0].toLowerCase() + exports.IProposalType[value].slice(1);
                    where += apolloKey + "_not: null\n";
                }
            }
            else if (Array.isArray(options.where[key])) {
                // Support for operators like _in
                var values = options.where[key].map(function (val) { return '"' + val + '"'; });
                where += key + ": [" + values.join(',') + "]\n";
            }
            else {
                if (key === 'proposer' || key === 'beneficiary' || key === 'dao') {
                    var option = options.where[key];
                    utils_1.isAddress(option);
                    where += key + ": \"" + option.toLowerCase() + "\"\n";
                }
                else {
                    where += key + ": \"" + options.where[key] + "\"\n";
                }
            }
        }
        var query;
        if (apolloQueryOptions.fetchAllData === true) {
            query = graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["query ProposalsSearchAllData\n        {\n          proposals ", " {\n            ...ProposalFields\n            votes {\n              id\n            }\n            stakes {\n              id\n            }\n          }\n        }\n        ", "\n        ", "\n      "], ["query ProposalsSearchAllData\n        {\n          proposals ", " {\n            ...ProposalFields\n            votes {\n              id\n            }\n            stakes {\n              id\n            }\n          }\n        }\n        ", "\n        ", "\n      "])), utils_1.createGraphQlQuery(options, where), Proposal.fragments.ProposalFields, scheme_1.Scheme.fragments.SchemeFields);
            return context.getObservableList(query, function (r) { return new Proposal(r, context); }, apolloQueryOptions);
        }
        else {
            query = graphql_tag_1.default(templateObject_2 || (templateObject_2 = __makeTemplateObject(["query ProposalSearchPartialData\n        {\n          proposals ", " {\n            id\n            dao {\n              id\n            }\n            votingMachine\n            scheme {\n              id\n              address\n            }\n          }\n        }\n      "], ["query ProposalSearchPartialData\n        {\n          proposals ", " {\n            id\n            dao {\n              id\n            }\n            votingMachine\n            scheme {\n              id\n              address\n            }\n          }\n        }\n      "])), utils_1.createGraphQlQuery(options, where));
            return context.getObservableList(query, function (r) { return new Proposal(r.id, context); }, apolloQueryOptions);
        }
    };
    Proposal.prototype.setStaticState = function (opts) {
        this.staticState = opts;
    };
    Proposal.prototype.fetchStaticState = function () {
        return __awaiter(this, void 0, void 0, function () {
            var state, staticState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!!this.staticState) return [3 /*break*/, 1];
                        return [2 /*return*/, this.staticState];
                    case 1: return [4 /*yield*/, this.state({ subscribe: false }).pipe(operators_1.first()).toPromise()];
                    case 2:
                        state = _a.sent();
                        if (state === null) {
                            throw Error("No proposal with id " + this.id + " was found in the subgraph");
                        }
                        staticState = {
                            dao: state.dao,
                            id: this.id,
                            scheme: state.scheme,
                            votingMachine: state.votingMachine
                        };
                        this.setStaticState(staticState);
                        return [2 /*return*/, staticState];
                }
            });
        });
    };
    /**
     * `state` is an observable of the proposal state
     */
    Proposal.prototype.state = function (apolloQueryOptions) {
        var _this = this;
        if (apolloQueryOptions === void 0) { apolloQueryOptions = {}; }
        var query = graphql_tag_1.default(templateObject_3 || (templateObject_3 = __makeTemplateObject(["query ProposalState\n      {\n        proposal(id: \"", "\") {\n          ...ProposalFields\n          votes {\n            id\n          }\n          stakes {\n            id\n          }\n        }\n      }\n      ", "\n      ", "\n\n    "], ["query ProposalState\n      {\n        proposal(id: \"", "\") {\n          ...ProposalFields\n          votes {\n            id\n          }\n          stakes {\n            id\n          }\n        }\n      }\n      ", "\n      ", "\n\n    "])), this.id, Proposal.fragments.ProposalFields, scheme_1.Scheme.fragments.SchemeFields);
        var itemMap = function (item) {
            if (item === null || item === undefined) {
                // no proposal was found - we return null
                // throw Error(`No proposal with id ${this.id} could be found`)
                return null;
            }
            var contributionReward = null;
            var competition = null;
            var type;
            var genericScheme = null;
            var schemeRegistrar = null;
            if (!!item.competition && !item.contributionReward) {
                throw Error("Unexpected proposal state: competition is set, but contributionReward is not");
            }
            if (!!item.contributionReward) {
                var ethRewardLeft = (item.contributionReward.ethRewardLeft !== null &&
                    new BN(item.contributionReward.ethRewardLeft) ||
                    null);
                var externalTokenRewardLeft = (item.contributionReward.externalTokenRewardLeft !== null &&
                    new BN(item.contributionReward.externalTokenRewardLeft) ||
                    null);
                var nativeTokenRewardLeft = (item.contributionReward.nativeTokenRewardLeft !== null &&
                    new BN(item.contributionReward.nativeTokenRewardLeft) ||
                    null);
                var reputationChangeLeft = (item.contributionReward.reputationChangeLeft !== null &&
                    new BN(item.contributionReward.reputationChangeLeft) ||
                    null);
                type = exports.IProposalType.ContributionReward;
                contributionReward = {
                    alreadyRedeemedEthPeriods: Number(item.contributionReward.alreadyRedeemedEthPeriods),
                    alreadyRedeemedExternalTokenPeriods: Number(item.contributionReward.alreadyRedeemedExternalTokenPeriods),
                    alreadyRedeemedNativeTokenPeriods: Number(item.contributionReward.alreadyRedeemedNativeTokenPeriods),
                    alreadyRedeemedReputationPeriods: Number(item.contributionReward.alreadyRedeemedReputationPeriods),
                    beneficiary: item.contributionReward.beneficiary,
                    ethReward: new BN(item.contributionReward.ethReward),
                    ethRewardLeft: ethRewardLeft,
                    externalToken: item.contributionReward.externalToken,
                    externalTokenReward: new BN(item.contributionReward.externalTokenReward),
                    externalTokenRewardLeft: externalTokenRewardLeft,
                    nativeTokenReward: new BN(item.contributionReward.nativeTokenReward),
                    nativeTokenRewardLeft: nativeTokenRewardLeft,
                    periodLength: Number(item.contributionReward.periodLength),
                    periods: Number(item.contributionReward.periods),
                    reputationChangeLeft: reputationChangeLeft,
                    reputationReward: new BN(0)
                };
                if (!!item.competition) {
                    competition = {
                        admin: item.competition.admin,
                        contract: item.competition.contract,
                        createdAt: utils_1.secondSinceEpochToDate(item.competition.createdAt),
                        endTime: utils_1.secondSinceEpochToDate(item.competition.endTime),
                        id: item.competition.id,
                        numberOfVotesPerVoter: Number(item.competition.numberOfVotesPerVoters),
                        numberOfWinners: Number(item.competition.numberOfWinners),
                        numberOfWinningSuggestions: Number(item.competition.numberOfWinningSuggestions),
                        rewardSplit: item.competition.rewardSplit.map(function (perc) { return Number(perc); }),
                        snapshotBlock: item.competition.snapshotBlock,
                        startTime: utils_1.secondSinceEpochToDate(item.competition.startTime),
                        suggestionsEndTime: utils_1.secondSinceEpochToDate(item.competition.suggestionsEndTime),
                        totalSuggestions: Number(item.competition.totalSuggestions),
                        totalVotes: Number(item.competition.totalVotes),
                        votingStartTime: utils_1.secondSinceEpochToDate(item.competition.votingStartTime)
                    };
                }
            }
            else if (item.genericScheme) {
                type = exports.IProposalType.GenericScheme;
                genericScheme = {
                    callData: item.genericScheme.callData,
                    contractToCall: item.genericScheme.contractToCall,
                    executed: item.genericScheme.executed,
                    id: item.genericScheme.id,
                    returnValue: item.genericScheme.returnValue
                };
            }
            else if (item.schemeRegistrar) {
                if (item.schemeRegistrar.schemeToRegister) {
                    // TODO: this is failing bc of https://github.com/daostack/subgraph/issues/224
                    if (item.dao.schemes.map(function (s) { return s.address.toLowerCase(); })
                        .includes(item.schemeRegistrar.schemeToRegister.toLowerCase())) {
                        type = exports.IProposalType.SchemeRegistrarEdit;
                    }
                    else {
                        type = exports.IProposalType.SchemeRegistrarAdd;
                    }
                }
                else if (item.schemeRegistrar.schemeToRemove) {
                    type = exports.IProposalType.SchemeRegistrarRemove;
                }
                else {
                    throw Error("Unknown proposal type: schemeRegistrar without a scheme to register or to remove");
                }
                schemeRegistrar = {
                    decision: item.schemeRegistrar.decision,
                    id: item.schemeRegistrar.id,
                    schemeRegistered: item.schemeRegistrar.schemeRegistered,
                    schemeRemoved: item.schemeRegistrar.schemeRemoved,
                    schemeToRegister: item.schemeRegistrar.schemeToRegister,
                    schemeToRegisterParamsHash: item.schemeRegistrar.schemeToRegisterParamsHash,
                    schemeToRegisterPermission: item.schemeRegistrar.schemeToRegisterPermission,
                    schemeToRemove: item.schemeRegistrar.schemeToRemove
                };
            }
            else {
                throw Error("Unknown proposal type or incomplete proposal data");
            }
            // the  formule to enter into the preboosted state is:
            // (S+/S-) > AlphaConstant^NumberOfBoostedProposal.
            // (stakesFor/stakesAgainst) > gpQueue.threshold
            var stage = IProposalStage[item.stage];
            var threshold = utils_1.realMathToNumber(new BN(item.gpQueue.threshold));
            var stakesFor = new BN(item.stakesFor);
            var stakesAgainst = new BN(item.stakesAgainst);
            /**
             * for doing multiplication between floating point (threshold) and BN numbers
             */
            var PRECISION = Math.pow(2, 40);
            /**
             * The number of up-staking tokens (usually GEN) needed to qualify a queued proposal to move into the
             * pre-boosted queue.
             *
             * Only computed for queued proposals.
             *
             * The equation is derived from: threshold = (stakesFor + upstakeNeededToPreBoost) / stakesAgainst
             *
             * Where `upstakeNeededToPreBoost` is:
             *
             * >= 0 : then any number of up-staking tokens greater than upstakeNeededToPreBoost will qualify
             *        to move the proposal to the preboost queue
             * <  0 : then the proposal ought already to be pre-boosted
             */
            var upstakeNeededToPreBoost = new BN(0);
            if (stage === IProposalStage.Queued) {
                upstakeNeededToPreBoost = new BN(threshold * PRECISION)
                    .mul(stakesAgainst)
                    .div(new BN(PRECISION))
                    .sub(stakesFor);
            }
            /**
             * The number of down-staking tokens (usually GEN) needed to qualify a pre-boosted proposal to move back
             * to the Queued queue.
             * Only computed for PreBoosted proposals.
             *
             * The equation is derived from: threshold = stakesFor / (stakesAgainst + downStakeNeededToQueue)
             *
             * When `downStakeNeededToQueue` is:
             *
             * >  0 : then any number of down-staking tokens greater-than-or-equal to downStakeNeededToQueue will qualify
             *        to move the proposal to the Queued queue
             * <= 0 : then the proposal ought to already be in the Queued queue
             */
            var downStakeNeededToQueue = new BN(0);
            if (stage === IProposalStage.PreBoosted) {
                downStakeNeededToQueue = stakesFor
                    .mul(new BN(PRECISION))
                    .div(new BN(threshold * PRECISION))
                    .sub(stakesAgainst);
            }
            var scheme = item.scheme;
            var gpQueue = item.gpQueue;
            var schemeState = scheme_1.Scheme.itemMap(scheme, _this.context);
            var queueState = {
                dao: item.dao.id,
                id: gpQueue.id,
                name: schemeState.name,
                scheme: schemeState,
                threshold: threshold,
                votingMachine: gpQueue.votingMachine
            };
            return {
                accountsWithUnclaimedRewards: item.accountsWithUnclaimedRewards,
                boostedAt: Number(item.boostedAt),
                closingAt: Number(item.closingAt),
                competition: competition,
                confidenceThreshold: Number(item.confidenceThreshold),
                contributionReward: contributionReward,
                createdAt: Number(item.createdAt),
                dao: new dao_1.DAO(item.dao.id, _this.context),
                description: item.description,
                descriptionHash: item.descriptionHash,
                downStakeNeededToQueue: downStakeNeededToQueue,
                executedAt: Number(item.executedAt),
                executionState: IExecutionState[item.executionState],
                expiresInQueueAt: Number(item.expiresInQueueAt),
                genericScheme: genericScheme,
                genesisProtocolParams: genesisProtocol_1.mapGenesisProtocolParams(item.genesisProtocolParams),
                id: item.id,
                organizationId: item.organizationId,
                paramsHash: item.paramsHash,
                preBoostedAt: Number(item.preBoostedAt),
                proposal: _this,
                proposer: item.proposer,
                queue: queueState,
                quietEndingPeriodBeganAt: Number(item.quietEndingPeriodBeganAt),
                resolvedAt: item.resolvedAt !== undefined ? Number(item.resolvedAt) : 0,
                scheme: schemeState,
                schemeRegistrar: schemeRegistrar,
                stage: stage,
                stakesAgainst: stakesAgainst,
                stakesFor: stakesFor,
                tags: item.tags.map(function (t) { return t.id; }),
                title: item.title,
                totalRepWhenCreated: new BN(item.totalRepWhenCreated),
                totalRepWhenExecuted: new BN(item.totalRepWhenExecuted),
                type: type,
                upstakeNeededToPreBoost: upstakeNeededToPreBoost,
                url: item.url,
                voteOnBehalf: item.voteOnBehalf,
                votesAgainst: new BN(item.votesAgainst),
                votesCount: item.votes.length,
                votesFor: new BN(item.votesFor),
                votingMachine: item.votingMachine,
                winningOutcome: IProposalOutcome[item.winningOutcome]
            };
        };
        var result = this.context.getObservableObject(query, itemMap, apolloQueryOptions);
        return result;
    };
    /**
     * @return the scheme Contract
     */
    Proposal.prototype.scheme = function () {
        return __awaiter(this, void 0, void 0, function () {
            var schemeAddress;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.state().pipe(operators_1.filter(function (o) { return !!o; }), operators_1.first()).toPromise()];
                    case 1:
                        schemeAddress = (_a.sent()).scheme.address;
                        return [2 /*return*/, this.context.getContract(schemeAddress)];
                }
            });
        });
    };
    /**
     * [votingMachine description]
     * @return a web3 Contract instance
     */
    Proposal.prototype.votingMachine = function () {
        return __awaiter(this, void 0, void 0, function () {
            var staticState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetchStaticState()];
                    case 1:
                        staticState = _a.sent();
                        return [2 /*return*/, this.context.getContract(staticState.votingMachine)];
                }
            });
        });
    };
    /**
     * [redeemerContract description]
     * @return a web3 Contract instance
     */
    Proposal.prototype.redeemerContract = function () {
        for (var _i = 0, REDEEMER_CONTRACT_VERSIONS_1 = settings_1.REDEEMER_CONTRACT_VERSIONS; _i < REDEEMER_CONTRACT_VERSIONS_1.length; _i++) {
            var version = REDEEMER_CONTRACT_VERSIONS_1[_i];
            try {
                var contractInfo = this.context.getContractInfoByName('Redeemer', version);
                return this.context.getContract(contractInfo.address);
            }
            catch (err) {
                if (!err.message.match(/no contract/i)) {
                    // if the contract cannot be found, try the next one
                    throw err;
                }
            }
        }
        throw Error("No Redeemer contract could be found (search for versions " + settings_1.REDEEMER_CONTRACT_VERSIONS + ")");
    };
    Proposal.prototype.votes = function (options, apolloQueryOptions) {
        if (options === void 0) { options = {}; }
        if (apolloQueryOptions === void 0) { apolloQueryOptions = {}; }
        if (!options.where) {
            options.where = {};
        }
        options.where.proposal = this.id;
        return vote_1.Vote.search(this.context, options, apolloQueryOptions);
    };
    /**
     * Vote for this proposal
     * @param  outcome one of IProposalOutcome.Pass (0) or IProposalOutcome.FAIL (1)
     * @param  amount the amount of reputation to vote with. Defaults to 0 - in that case,
     *  all the sender's rep will be used
     * @return  an observable Operation<Vote>
     */
    Proposal.prototype.vote = function (outcome, amount) {
        var _this = this;
        if (amount === void 0) { amount = 0; }
        var mapReceipt = function (receipt) {
            var event = receipt.events.VoteProposal;
            if (!event) {
                // no vote was cast
                return null;
            }
            return new vote_1.Vote({
                amount: event.returnValues._reputation,
                // createdAt is "about now", but we cannot calculate the data that will be indexed by the subgraph
                createdAt: 0,
                outcome: outcome,
                proposal: _this.id,
                voter: event.returnValues._voter
            }, _this.context);
        };
        var observable = rxjs_1.from(this.votingMachine()).pipe(operators_1.concatMap(function (votingMachine) {
            var voteMethod = votingMachine.methods.vote(_this.id, // proposalId
            outcome, // a value between 0 to and the proposal number of choices.
            amount.toString(), // amount of reputation to vote with . if _amount == 0 it will use all voter reputation.
            utils_1.NULL_ADDRESS);
            var errorHandler = function (error) { return __awaiter(_this, void 0, void 0, function () {
                var proposal, proposalDataFromVotingMachine, msg;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            proposal = this;
                            return [4 /*yield*/, votingMachine.methods.proposals(proposal.id).call()];
                        case 1:
                            proposalDataFromVotingMachine = _a.sent();
                            if (proposalDataFromVotingMachine.proposer === utils_1.NULL_ADDRESS) {
                                return [2 /*return*/, Error("Error in vote(): unknown proposal with id " + proposal.id)];
                            }
                            if (proposalDataFromVotingMachine.state === '2') {
                                msg = "Error in vote(): proposal " + proposal.id + " already executed";
                                return [2 /*return*/, Error(msg)];
                            }
                            // call the method, so we collect any errors from the EVM
                            return [4 /*yield*/, voteMethod.call()
                                // if everything seems fine, just return the oroginal error
                            ];
                        case 2:
                            // call the method, so we collect any errors from the EVM
                            _a.sent();
                            // if everything seems fine, just return the oroginal error
                            return [2 /*return*/, error];
                    }
                });
            }); };
            return _this.context.sendTransaction(voteMethod, mapReceipt, errorHandler);
        }));
        return operation_1.toIOperationObservable(observable);
    };
    Proposal.prototype.stakingToken = function () {
        return this.context.GENToken();
    };
    Proposal.prototype.stakes = function (options, apolloQueryOptions) {
        if (options === void 0) { options = {}; }
        if (apolloQueryOptions === void 0) { apolloQueryOptions = {}; }
        if (!options.where) {
            options.where = {};
        }
        options.where.proposal = this.id;
        return stake_1.Stake.search(this.context, options, apolloQueryOptions);
    };
    /**
     * Stake on this proposal
     * @param  outcome the outcome that is staked on, of type IProposalOutcome
     * @param  amount  the amount, in GEN, to stake
     * @return  An observable that can be sent, or subscribed to
     */
    Proposal.prototype.stake = function (outcome, amount) {
        var _this = this;
        var observable = rxjs_1.from(this.votingMachine()).pipe(operators_1.concatMap(function (votingMachine) {
            var map = function (receipt) {
                var event = receipt.events.Stake;
                if (!event) {
                    // for some reason, a transaction was mined but no error was raised before
                    throw new Error("Error staking: no \"Stake\" event was found - " + Object.keys(receipt.events));
                }
                return new stake_1.Stake({
                    amount: event.returnValues._reputation,
                    // createdAt is "about now", but we cannot calculate the data that will be indexed by the subgraph
                    createdAt: undefined,
                    outcome: outcome,
                    proposal: _this.id,
                    staker: event.returnValues._staker
                }, _this.context);
            };
            var errorHandler = function (error) { return __awaiter(_this, void 0, void 0, function () {
                var proposal, proposalState, stakingToken, defaultAccount, balance, _a, amountBN, msg, allowance, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            proposal = this;
                            return [4 /*yield*/, this.votingMachine()];
                        case 1: return [4 /*yield*/, (_c.sent()).methods.proposals(proposal.id).call()];
                        case 2:
                            proposalState = _c.sent();
                            stakingToken = this.stakingToken();
                            if (proposalState.proposer === utils_1.NULL_ADDRESS) {
                                return [2 /*return*/, new Error("Unknown proposal with id " + proposal.id)];
                            }
                            return [4 /*yield*/, this.context.getAccount().pipe(operators_1.first()).toPromise()];
                        case 3:
                            defaultAccount = _c.sent();
                            _a = BN.bind;
                            return [4 /*yield*/, stakingToken.contract().methods.balanceOf(defaultAccount).call()];
                        case 4:
                            balance = new (_a.apply(BN, [void 0, _c.sent()]))();
                            amountBN = new BN(amount);
                            if (balance.lt(amountBN)) {
                                msg = "Staker " + defaultAccount + " has insufficient balance to stake " + amount.toString() + "\n              (balance is " + balance.toString() + ")";
                                return [2 /*return*/, new Error(msg)];
                            }
                            _b = BN.bind;
                            return [4 /*yield*/, stakingToken.contract().methods.allowance(defaultAccount, votingMachine.options.address).call()];
                        case 5:
                            allowance = new (_b.apply(BN, [void 0, _c.sent()]))();
                            if (allowance.lt(amountBN)) {
                                return [2 /*return*/, new Error("Staker has insufficient allowance to stake " + amount.toString() + "\n                (allowance for " + votingMachine.options.address + " is " + allowance.toString() + ")")];
                            }
                            // call the stake function and bubble up any solidity errors
                            return [4 /*yield*/, stakeMethod.call()];
                        case 6:
                            // call the stake function and bubble up any solidity errors
                            _c.sent();
                            if (!!error.message.match(/event was found/)) {
                                if (proposalState.state === IProposalStage.Boosted) {
                                    return [2 /*return*/, new Error("Staking failed because the proposal is boosted")];
                                }
                            }
                            // if we have found no known error, we return the original error
                            return [2 /*return*/, error];
                    }
                });
            }); };
            var stakeMethod = votingMachine.methods.stake(_this.id, // proposalId
            outcome, // a value between 0 to and the proposal number of choices.
            amount.toString() // the amount of tokens to stake
            );
            return _this.context.sendTransaction(stakeMethod, map, errorHandler);
        }));
        return operation_1.toIOperationObservable(observable);
    };
    Proposal.prototype.rewards = function (options, apolloQueryOptions) {
        if (options === void 0) { options = {}; }
        if (apolloQueryOptions === void 0) { apolloQueryOptions = {}; }
        if (!options.where) {
            options.where = {};
        }
        options.where.proposal = this.id;
        return reward_1.Reward.search(this.context, options, apolloQueryOptions);
    };
    /**
     * [claimRewards description] Execute the proposal and distribute the rewards
     * to the beneficiary.
     * This uses the Redeemer.sol helper contract
     * @param  beneficiary Addresss of the beneficiary, optional,
     *    if undefined will only redeem the ContributionReward rewards
     * @return  an Operation
     */
    Proposal.prototype.claimRewards = function (beneficiary) {
        var _this = this;
        if (!beneficiary) {
            beneficiary = utils_1.NULL_ADDRESS;
        }
        var observable = this.state().pipe(operators_1.first(), operators_1.concatMap(function (state) {
            var schemeAddress;
            if (state.contributionReward) {
                schemeAddress = state.scheme.address;
            }
            else {
                // if this is not a contributionreard scheme, we can use any scheme address as
                // a dummy placeholder, and the redeem function will still work
                schemeAddress = _this.context.getContractInfoByName('ContributionReward', settings_1.CONTRIBUTION_REWARD_DUMMY_VERSION).address;
            }
            var transaction;
            if (state.scheme.name === 'ContributionRewardExt') {
                transaction = _this.redeemerContract().methods.redeemFromCRExt(schemeAddress, // contributionreward address
                state.votingMachine, // genesisProtocol address
                _this.id, beneficiary);
            }
            else {
                transaction = _this.redeemerContract().methods.redeem(schemeAddress, // contributionreward address
                state.votingMachine, // genesisProtocol address
                _this.id, state.dao.id, beneficiary);
            }
            var contract = _this.context.getContract(schemeAddress);
            transaction = contract.methods.redeem(_this.id, state.dao.id, [true, true, true, true]);
            return _this.context.sendTransaction(transaction, function () { return true; });
        }));
        return operation_1.toIOperationObservable(observable);
    };
    /**
     * calll the 'execute()' function on the votingMachine.
     * the main purpose of this function is to set the stage of the proposals
     * this call may (or may not) "execute" the proposal itself (i.e. do what the proposal proposes)
     * @return an Operation that, when sucessful, will contain the receipt of the transaction
     */
    Proposal.prototype.execute = function () {
        var _this = this;
        var observable = rxjs_1.from(this.votingMachine()).pipe(operators_1.concatMap(function (votingMachine) {
            var transaction = votingMachine.methods.execute(_this.id);
            var map = function (receipt) {
                if (Object.keys(receipt.events).length === 0) {
                    // this does not mean that anything failed
                    return receipt;
                }
                else {
                    return receipt;
                }
            };
            var errorHandler = function (err) { return __awaiter(_this, void 0, void 0, function () {
                var proposalDataFromVotingMachine, msg, msg;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, votingMachine.methods.proposals(this.id).call()];
                        case 1:
                            proposalDataFromVotingMachine = _a.sent();
                            if (proposalDataFromVotingMachine.callbacks === utils_1.NULL_ADDRESS) {
                                msg = "Error in proposal.execute(): A proposal with id " + this.id + " does not exist";
                                return [2 /*return*/, Error(msg)];
                            }
                            else if (proposalDataFromVotingMachine.state === '2') {
                                msg = "Error in proposal.execute(): proposal " + this.id + " already executed";
                                return [2 /*return*/, Error(msg)];
                            }
                            return [4 /*yield*/, transaction.call()];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, err];
                    }
                });
            }); };
            return _this.context.sendTransaction(transaction, map, errorHandler);
        }));
        return operation_1.toIOperationObservable(observable);
    };
    Proposal.prototype.executeBoosted = function () {
        var _this = this;
        var observable = rxjs_1.from(this.votingMachine()).pipe(operators_1.concatMap(function (votingMachine) {
            var transaction = votingMachine.methods.executeBoosted(_this.id);
            console.log(votingMachine.options.address);
            var map = function (receipt) {
                if (Object.keys(receipt.events).length === 0) {
                    // this does not mean that anything failed
                    return receipt;
                }
                else {
                    return receipt;
                }
            };
            var errorHandler = function (err) { return __awaiter(_this, void 0, void 0, function () {
                var proposalDataFromVotingMachine, msg;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, votingMachine.methods.proposals(this.id).call()];
                        case 1:
                            proposalDataFromVotingMachine = _a.sent();
                            if (proposalDataFromVotingMachine.callbacks === utils_1.NULL_ADDRESS) {
                                msg = "Error in proposal.executeBoosted(): A proposal with id " + this.id + " does not exist";
                                return [2 /*return*/, Error(msg)];
                            }
                            console.log('accling...');
                            return [4 /*yield*/, transaction.call()];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, err];
                    }
                });
            }); };
            return _this.context.sendTransaction(transaction, map, errorHandler);
        }));
        return operation_1.toIOperationObservable(observable);
    };
    Proposal.fragments = {
        ProposalFields: graphql_tag_1.default(templateObject_4 || (templateObject_4 = __makeTemplateObject(["fragment ProposalFields on Proposal {\n      id\n      accountsWithUnclaimedRewards\n      boostedAt\n      closingAt\n      confidenceThreshold\n      competition {\n        id\n        admin\n        endTime\n        contract\n        suggestionsEndTime\n        createdAt\n        numberOfWinningSuggestions\n        numberOfVotesPerVoters\n        numberOfWinners\n        rewardSplit\n        snapshotBlock\n        startTime\n        totalSuggestions\n        totalVotes\n        votingStartTime\n\n      }\n      contributionReward {\n        id\n        beneficiary\n        ethReward\n        ethRewardLeft\n        externalToken\n        externalTokenReward\n        externalTokenRewardLeft\n        nativeTokenReward\n        nativeTokenRewardLeft\n        periods\n        periodLength\n        reputationReward\n        reputationChangeLeft\n        alreadyRedeemedReputationPeriods\n        alreadyRedeemedExternalTokenPeriods\n        alreadyRedeemedNativeTokenPeriods\n        alreadyRedeemedEthPeriods\n      }\n      createdAt\n      dao {\n        id\n        schemes {\n          id\n          address\n        }\n      }\n      description\n      descriptionHash\n      executedAt\n      executionState\n      expiresInQueueAt\n      genericScheme {\n        id\n        contractToCall\n        callData\n        executed\n        returnValue\n      }\n      genesisProtocolParams {\n        id\n        activationTime\n        boostedVotePeriodLimit\n        daoBountyConst\n        limitExponentValue\n        minimumDaoBounty\n        preBoostedVotePeriodLimit\n        proposingRepReward\n        queuedVotePeriodLimit\n        queuedVoteRequiredPercentage\n        quietEndingPeriod\n        thresholdConst\n        votersReputationLossRatio\n      }\n      gpRewards {\n        id\n      }\n      scheme {\n        ...SchemeFields\n      }\n      gpQueue {\n        id\n        threshold\n        votingMachine\n      }\n      organizationId\n      preBoostedAt\n      proposer\n      quietEndingPeriodBeganAt\n      schemeRegistrar {\n        id\n        schemeToRegister\n        schemeToRegisterParamsHash\n        schemeToRegisterPermission\n        schemeToRemove\n        decision\n        schemeRegistered\n        schemeRemoved\n      }\n      stage\n      # stakes { id }\n      stakesFor\n      stakesAgainst\n      tags {\n        id\n      }\n      totalRepWhenCreated\n      totalRepWhenExecuted\n      title\n      url\n      # votes { id }\n      votesAgainst\n      votesFor\n      votingMachine\n      winningOutcome\n    }"], ["fragment ProposalFields on Proposal {\n      id\n      accountsWithUnclaimedRewards\n      boostedAt\n      closingAt\n      confidenceThreshold\n      competition {\n        id\n        admin\n        endTime\n        contract\n        suggestionsEndTime\n        createdAt\n        numberOfWinningSuggestions\n        numberOfVotesPerVoters\n        numberOfWinners\n        rewardSplit\n        snapshotBlock\n        startTime\n        totalSuggestions\n        totalVotes\n        votingStartTime\n\n      }\n      contributionReward {\n        id\n        beneficiary\n        ethReward\n        ethRewardLeft\n        externalToken\n        externalTokenReward\n        externalTokenRewardLeft\n        nativeTokenReward\n        nativeTokenRewardLeft\n        periods\n        periodLength\n        reputationReward\n        reputationChangeLeft\n        alreadyRedeemedReputationPeriods\n        alreadyRedeemedExternalTokenPeriods\n        alreadyRedeemedNativeTokenPeriods\n        alreadyRedeemedEthPeriods\n      }\n      createdAt\n      dao {\n        id\n        schemes {\n          id\n          address\n        }\n      }\n      description\n      descriptionHash\n      executedAt\n      executionState\n      expiresInQueueAt\n      genericScheme {\n        id\n        contractToCall\n        callData\n        executed\n        returnValue\n      }\n      genesisProtocolParams {\n        id\n        activationTime\n        boostedVotePeriodLimit\n        daoBountyConst\n        limitExponentValue\n        minimumDaoBounty\n        preBoostedVotePeriodLimit\n        proposingRepReward\n        queuedVotePeriodLimit\n        queuedVoteRequiredPercentage\n        quietEndingPeriod\n        thresholdConst\n        votersReputationLossRatio\n      }\n      gpRewards {\n        id\n      }\n      scheme {\n        ...SchemeFields\n      }\n      gpQueue {\n        id\n        threshold\n        votingMachine\n      }\n      organizationId\n      preBoostedAt\n      proposer\n      quietEndingPeriodBeganAt\n      schemeRegistrar {\n        id\n        schemeToRegister\n        schemeToRegisterParamsHash\n        schemeToRegisterPermission\n        schemeToRemove\n        decision\n        schemeRegistered\n        schemeRemoved\n      }\n      stage\n      # stakes { id }\n      stakesFor\n      stakesAgainst\n      tags {\n        id\n      }\n      totalRepWhenCreated\n      totalRepWhenExecuted\n      title\n      url\n      # votes { id }\n      votesAgainst\n      votesFor\n      votingMachine\n      winningOutcome\n    }"])))
    };
    return Proposal;
}());
exports.Proposal = Proposal;
var ProposalQuerySortOptions;
(function (ProposalQuerySortOptions) {
    ProposalQuerySortOptions["resolvesAt"] = "resolvesAt";
    ProposalQuerySortOptions["preBoostedAt"] = "preBoostedAt";
})(ProposalQuerySortOptions || (ProposalQuerySortOptions = {}));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=proposal.js.map