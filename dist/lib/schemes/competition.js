"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var dao_1 = require("../dao");
var genesisProtocol_1 = require("../genesisProtocol");
var operation_1 = require("../operation");
var proposal_1 = require("../proposal");
var utils_1 = require("../utils");
var base_1 = require("./base");
var Web3 = require('web3');
var CompetitionScheme = /** @class */ (function (_super) {
    __extends(CompetitionScheme, _super);
    function CompetitionScheme() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CompetitionScheme.prototype.state = function (apolloQueryOptions) {
        var _this = this;
        if (apolloQueryOptions === void 0) { apolloQueryOptions = {}; }
        var query = graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["query SchemeStateById\n      {\n        controllerScheme (id: \"", "\") {\n          ...SchemeFields\n        }\n      }\n      ", "\n    "], ["query SchemeStateById\n      {\n        controllerScheme (id: \"", "\") {\n          ...SchemeFields\n        }\n      }\n      ", "\n    "])), this.id, base_1.SchemeBase.fragments.SchemeFields);
        var itemMap = function (item) {
            if (!item) {
                return null;
            }
            var name = item.name;
            if (!name) {
                try {
                    name = _this.context.getContractInfo(item.address).name;
                }
                catch (err) {
                    if (err.message.match(/no contract/ig)) {
                        // continue
                    }
                    else {
                        throw err;
                    }
                }
            }
            var uGenericSchemeParams = item.uGenericSchemeParams && {
                contractToCall: item.uGenericSchemeParams.contractToCall,
                voteParams: genesisProtocol_1.mapGenesisProtocolParams(item.uGenericSchemeParams.voteParams),
                votingMachine: item.uGenericSchemeParams.votingMachine
            };
            var contributionRewardParams = item.contributionRewardParams && {
                voteParams: genesisProtocol_1.mapGenesisProtocolParams(item.contributionRewardParams.voteParams),
                votingMachine: item.contributionRewardParams.votingMachine
            };
            var contributionRewardExtParams = item.contributionRewardExtParams && {
                rewarder: item.contributionRewardExtParams.rewarder,
                voteParams: genesisProtocol_1.mapGenesisProtocolParams(item.contributionRewardExtParams.voteParams),
                votingMachine: item.contributionRewardExtParams.votingMachine
            };
            var schemeRegistrarParams = item.schemeRegistrarParams && {
                voteRegisterParams: genesisProtocol_1.mapGenesisProtocolParams(item.schemeRegistrarParams.voteRegisterParams),
                voteRemoveParams: genesisProtocol_1.mapGenesisProtocolParams(item.schemeRegistrarParams.voteRemoveParams),
                votingMachine: item.schemeRegistrarParams.votingMachine
            };
            var genericSchemeParams = item.genericSchemeParams && {
                contractToCall: item.genericSchemeParams.contractToCall,
                voteParams: genesisProtocol_1.mapGenesisProtocolParams(item.genericSchemeParams.voteParams),
                votingMachine: item.genericSchemeParams.votingMachine
            };
            var schemeParams = (uGenericSchemeParams || contributionRewardParams ||
                schemeRegistrarParams || genericSchemeParams || contributionRewardExtParams);
            return {
                address: item.address,
                canDelegateCall: item.canDelegateCall,
                canManageGlobalConstraints: item.canManageGlobalConstraints,
                canRegisterSchemes: item.canRegisterSchemes,
                canUpgradeController: item.canUpgradeController,
                contributionRewardExtParams: contributionRewardExtParams,
                contributionRewardParams: contributionRewardParams,
                dao: item.dao.id,
                genericSchemeParams: genericSchemeParams,
                id: item.id,
                isRegistered: item.isRegistered,
                name: name,
                numberOfBoostedProposals: Number(item.numberOfBoostedProposals),
                numberOfPreBoostedProposals: Number(item.numberOfPreBoostedProposals),
                numberOfQueuedProposals: Number(item.numberOfQueuedProposals),
                paramsHash: item.paramsHash,
                schemeParams: schemeParams,
                schemeRegistrarParams: schemeRegistrarParams,
                uGenericSchemeParams: uGenericSchemeParams,
                version: item.version
            };
        };
        return this.context.getObservableObject(query, itemMap, apolloQueryOptions);
    };
    /**
     * Return a list of competitions in this scheme.
     * @param options
     * @param apolloQueryOptions
     */
    CompetitionScheme.prototype.competitions = function (options, apolloQueryOptions) {
        if (options === void 0) { options = {}; }
        if (apolloQueryOptions === void 0) { apolloQueryOptions = {}; }
        // TODO: This function will error if the current scheme is not a competiion scheme
        // const staticState = await this.fetchStaticState()
        // if (staticState.name !== `ContributionRewardExt`) {
        //   // TODO: we should also check if the calling
        //   throw Error(`This scheme is not a competition scheme - so no competitions can be found`)
        // }
        if (!options.where) {
            options.where = {};
        }
        options.where = __assign(__assign({}, options.where), { competition_not: null });
        return Competition.search(this.context, options, apolloQueryOptions);
    };
    /**
     *
     * @param options
     * @param context
     */
    CompetitionScheme.prototype.createProposalTransaction = function (options) {
        var _this = this;
        // we assume this function is called with the correct scheme options..
        return function () { return __awaiter(_this, void 0, void 0, function () {
            var context, schemeState, contract, contributionRewardExtAddress, _a, competitionParams, proposerIsAdmin, transaction;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        context = this.context;
                        return [4 /*yield*/, this.state().pipe(operators_1.first()).toPromise()];
                    case 1:
                        schemeState = _b.sent();
                        if (!schemeState) {
                            throw Error("No scheme was found with this id: " + this.id);
                        }
                        contract = getCompetitionContract(schemeState, this.context);
                        return [4 /*yield*/, contract.methods.contributionRewardExt().call()];
                    case 2:
                        contributionRewardExtAddress = _b.sent();
                        if (contributionRewardExtAddress.toLowerCase() !== schemeState.address) {
                            throw Error("This ContributionRewardExt/Competition combo is malconfigured: expected " + contributionRewardExtAddress.toLowerCase() + " to equal " + schemeState.address);
                        }
                        _a = options;
                        return [4 /*yield*/, context.saveIPFSData(options)];
                    case 3:
                        _a.descriptionHash = _b.sent();
                        if (!options.rewardSplit) {
                            throw Error("Rewardsplit was not given..");
                        }
                        else {
                            if (options.rewardSplit.reduce(function (a, b) { return a + b; }) !== 100) {
                                throw Error("Rewardsplit must sum 100 (they sum to  " + options.rewardSplit.reduce(function (a, b) { return a + b; }) + ")");
                            }
                        }
                        competitionParams = [
                            options.startTime && utils_1.dateToSecondsSinceEpoch(options.startTime) || '0',
                            utils_1.dateToSecondsSinceEpoch(options.votingStartTime) || 0,
                            utils_1.dateToSecondsSinceEpoch(options.endTime) || 0,
                            options.numberOfVotesPerVoter.toString() || 0,
                            utils_1.dateToSecondsSinceEpoch(options.suggestionsEndTime) || 0
                        ];
                        proposerIsAdmin = !!options.proposerIsAdmin;
                        transaction = contract.methods.proposeCompetition(options.descriptionHash || '', options.reputationReward && options.reputationReward.toString() || 0, [
                            options.nativeTokenReward && options.nativeTokenReward.toString() || 0,
                            options.ethReward && options.ethReward.toString() || 0,
                            options.externalTokenReward && options.externalTokenReward.toString() || 0
                        ], options.externalTokenAddress || utils_1.NULL_ADDRESS, options.rewardSplit, competitionParams, proposerIsAdmin);
                        return [2 /*return*/, transaction];
                }
            });
        }); };
    };
    CompetitionScheme.prototype.createProposalTransactionMap = function () {
        var _this = this;
        var eventName = 'NewCompetitionProposal';
        var txMap = function (receipt) {
            var proposalId = receipt.events[eventName].returnValues._proposalId;
            return new proposal_1.Proposal(proposalId, _this.context);
        };
        return txMap;
    };
    CompetitionScheme.prototype.createProposalErrorHandler = function (options) {
        var _this = this;
        return function (err) { return __awaiter(_this, void 0, void 0, function () {
            var tx, err_1, _a, _b, msg;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        console.log("hanlding errrrrr");
                        return [4 /*yield*/, this.createProposalTransaction(options)()];
                    case 1:
                        tx = _c.sent();
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 4, , 8]);
                        return [4 /*yield*/, tx.call()];
                    case 3:
                        _c.sent();
                        return [3 /*break*/, 8];
                    case 4:
                        err_1 = _c.sent();
                        if (!err_1.message.match(/startTime should be greater than proposing time/ig)) return [3 /*break*/, 6];
                        _a = Error;
                        _b = err_1.message + " - startTime is " + options.startTime + ", current block time is ";
                        return [4 /*yield*/, utils_1.getBlockTime(this.context.web3)];
                    case 5: return [2 /*return*/, _a.apply(void 0, [_b + (_c.sent())])];
                    case 6: return [2 /*return*/, err_1];
                    case 7: return [3 /*break*/, 8];
                    case 8:
                        msg = "Error creating proposal: " + err.message;
                        return [2 /*return*/, Error(msg)];
                }
            });
        }); };
    };
    /**
     * create a proposal for starting a Competition
     *
     * @param {IProposalCreateOptionsCompetition} options
     * @returns {Operation<Proposal>}
     * @memberof CompetitionScheme
     */
    CompetitionScheme.prototype.createProposal = function (options) {
        return base_1.SchemeBase.prototype.createProposal.call(this, options);
    };
    CompetitionScheme.prototype.getCompetitionContract = function () {
        return __awaiter(this, void 0, void 0, function () {
            var schemeState, contract;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.state().pipe(operators_1.first()).toPromise()];
                    case 1:
                        schemeState = _a.sent();
                        contract = getCompetitionContract(schemeState, this.context);
                        return [2 /*return*/, contract];
                }
            });
        });
    };
    /**
     * Vote for the suggestion that is, in the current scheme, identified by  suggestionId
     *
     * @param {{
     *     suggestionId: number // this is the suggestion COUNTER
     *   }} options
     * @returns {Operation<CompetitionVote>}
     * @memberof CompetitionScheme
     */
    CompetitionScheme.prototype.voteSuggestion = function (options) {
        var _this = this;
        var createTransaction = function () { return __awaiter(_this, void 0, void 0, function () {
            var contract, transaction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getCompetitionContract()];
                    case 1:
                        contract = _a.sent();
                        transaction = contract.methods.vote(options.suggestionId);
                        return [2 /*return*/, transaction];
                }
            });
        }); };
        var mapReceipt = function (receipt) {
            if (Object.keys(receipt.events).length === 0) {
                // this does not mean that anything failed
                return receipt;
            }
            else {
                var eventName = 'NewVote';
                // emit NewVote(proposalId, _suggestionId, msg.sender, reputation);
                var suggestionId = receipt.events[eventName].returnValues._suggestionId;
                var voter = receipt.events[eventName].returnValues._voter;
                var reputation = receipt.events[eventName].returnValues._reputation;
                var proposal = receipt.events[eventName].returnValues._proposalId;
                var suggestion = CompetitionSuggestion.calculateId({
                    scheme: _this.id,
                    suggestionId: suggestionId
                });
                return new CompetitionVote({
                    proposal: proposal,
                    reputation: reputation,
                    suggestion: suggestion,
                    voter: voter
                }, _this.context);
            }
        };
        var errorHandler = function (err) { return __awaiter(_this, void 0, void 0, function () {
            var schemeState, contract, suggestion, state, dao, reputation, sender, reputationOfUser, tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.state().pipe(operators_1.first()).toPromise()];
                    case 1:
                        schemeState = _a.sent();
                        contract = getCompetitionContract(schemeState, this.context);
                        return [4 /*yield*/, contract.methods.suggestions(options.suggestionId).call()];
                    case 2:
                        suggestion = _a.sent();
                        if (suggestion.proposalId === '0x0000000000000000000000000000000000000000000000000000000000000000') {
                            throw Error("A suggestion with suggestionId " + options.suggestionId + " does not exist");
                        }
                        return [4 /*yield*/, this.state().pipe(operators_1.first()).toPromise()];
                    case 3:
                        state = _a.sent();
                        dao = new dao_1.DAO(state.dao, this.context);
                        return [4 /*yield*/, dao.nativeReputation().pipe(operators_1.first()).toPromise()];
                    case 4:
                        reputation = _a.sent();
                        return [4 /*yield*/, this.context.getAccount().pipe(operators_1.first()).toPromise()];
                    case 5:
                        sender = _a.sent();
                        return [4 /*yield*/, reputation.reputationOf(sender).pipe(operators_1.first()).toPromise()];
                    case 6:
                        reputationOfUser = _a.sent();
                        if (reputationOfUser.isZero()) {
                            throw Error("Cannot vote because the user " + sender + " does not have any reputation in the DAO at " + dao.id);
                        }
                        return [4 /*yield*/, createTransaction()];
                    case 7:
                        tx = _a.sent();
                        return [4 /*yield*/, tx.call()];
                    case 8:
                        _a.sent();
                        return [2 /*return*/, err];
                }
            });
        }); };
        var observable = this.context.sendTransaction(createTransaction, mapReceipt, errorHandler);
        return operation_1.toIOperationObservable(observable);
    };
    CompetitionScheme.prototype.redeemSuggestion = function (options) {
        var _this = this;
        var createTransaction = function () { return __awaiter(_this, void 0, void 0, function () {
            var schemeState, contract, transaction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.state().pipe(operators_1.first()).toPromise()];
                    case 1:
                        schemeState = _a.sent();
                        contract = getCompetitionContract(schemeState, this.context);
                        transaction = contract.methods.redeem(options.suggestionId);
                        return [2 /*return*/, transaction];
                }
            });
        }); };
        var mapReceipt = function (receipt) {
            if (Object.keys(receipt.events).length === 0) {
                return receipt;
            }
            else {
                // const eventName = 'Redeem'
                // const proposalId = receipt.events[eventName].returnValues._proposalId
                // const suggestionId = receipt.events[eventName].returnValues._suggestionId
                // const rewardPercentage = receipt.events[eventName].returnValues._rewardPercentage
                return true;
            }
        };
        var errorHandler = function (err) { return __awaiter(_this, void 0, void 0, function () {
            var schemeState, contract, suggestion, tx, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.state().pipe(operators_1.first()).toPromise()];
                    case 1:
                        schemeState = _a.sent();
                        contract = getCompetitionContract(schemeState, this.context);
                        return [4 /*yield*/, contract.methods.suggestions(options.suggestionId).call()];
                    case 2:
                        suggestion = _a.sent();
                        if (suggestion.proposalId === '0x0000000000000000000000000000000000000000000000000000000000000000') {
                            throw Error("A suggestion with suggestionId " + options.suggestionId + " does not exist");
                        }
                        return [4 /*yield*/, createTransaction()];
                    case 3:
                        tx = _a.sent();
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        // call the transaction to get the solidity-defined errors
                        return [4 /*yield*/, tx.call()];
                    case 5:
                        // call the transaction to get the solidity-defined errors
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        err_2 = _a.sent();
                        throw err_2;
                    case 7: 
                    // const proposal = await contract.methods.proposals(suggestion.proposalId).call()
                    // const proposalEndTime = new Date(proposal.endTime * 1000)
                    // const currentTime = await getBlockTime(this.context.web3)
                    // const msg = `Redeem failed because the proposals endTime ${proposalEndTime}
                    //   is later then current block time ${currentTime}`
                    // if (proposalEndTime > currentTime) {
                    //   throw Error(msg)
                    // }
                    return [2 /*return*/, err];
                }
            });
        }); };
        var observable = this.context.sendTransaction(createTransaction, mapReceipt, errorHandler);
        return operation_1.toIOperationObservable(observable);
    };
    return CompetitionScheme;
}(base_1.SchemeBase));
exports.CompetitionScheme = CompetitionScheme;
// export function createProposalErrorHandler(err: Error) {
//   return err
// }
var Competition = /** @class */ (function () {
    function Competition(id, context) {
        // super(id, context)
        this.id = id;
        this.context = context;
    }
    Competition.search = function (context, options, apolloQueryOptions) {
        if (options === void 0) { options = {}; }
        if (apolloQueryOptions === void 0) { apolloQueryOptions = {}; }
        return proposal_1.Proposal.search(context, options, apolloQueryOptions).pipe(operators_1.map(function (proposals) { return proposals.map(function (p) { return new Competition(p.id, context); }); }));
    };
    Competition.prototype.createSuggestion = function (options) {
        var _this = this;
        var schemeState;
        var createTransaction = function () { return __awaiter(_this, void 0, void 0, function () {
            var proposalState, _a, contract, descriptionHash, transaction;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (new proposal_1.Proposal(this.id, this.context)).state().pipe(operators_1.first()).toPromise()];
                    case 1:
                        proposalState = _b.sent();
                        if (!!options.beneficiary) return [3 /*break*/, 3];
                        _a = options;
                        return [4 /*yield*/, this.context.getAccount().pipe(operators_1.first()).toPromise()];
                    case 2:
                        _a.beneficiary = _b.sent();
                        _b.label = 3;
                    case 3: return [4 /*yield*/, (new CompetitionScheme(proposalState.scheme.id, this.context))
                            .state().pipe(operators_1.first()).toPromise()];
                    case 4:
                        schemeState = _b.sent();
                        contract = getCompetitionContract(schemeState, this.context);
                        return [4 /*yield*/, this.context.saveIPFSData(options)];
                    case 5:
                        descriptionHash = _b.sent();
                        transaction = contract.methods.suggest(this.id, descriptionHash, options.beneficiary);
                        return [2 /*return*/, transaction];
                }
            });
        }); };
        var mapReceipt = function (receipt) {
            if (Object.keys(receipt.events).length === 0) {
                // this does not mean that anything failed
                return receipt;
            }
            else {
                var eventName = 'NewSuggestion';
                var suggestionId = receipt.events[eventName].returnValues._suggestionId;
                return new CompetitionSuggestion({ scheme: schemeState.id, suggestionId: suggestionId }, _this.context);
            }
        };
        var errorHandler = function (err, transaction, opts) { return __awaiter(_this, void 0, void 0, function () {
            var contract, proposal, tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        contract = getCompetitionContract(schemeState, this.context);
                        return [4 /*yield*/, contract.methods.proposals(this.id).call(opts)];
                    case 1:
                        proposal = _a.sent();
                        if (!proposal) {
                            throw Error("A proposal with id " + this.id + " does not exist");
                        }
                        return [4 /*yield*/, createTransaction()];
                    case 2:
                        tx = _a.sent();
                        return [4 /*yield*/, tx.call(opts)];
                    case 3:
                        _a.sent();
                        throw err;
                }
            });
        }); };
        var observable = this.context.sendTransaction(createTransaction, mapReceipt, errorHandler);
        return operation_1.toIOperationObservable(observable);
    };
    Competition.prototype.voteSuggestion = function (suggestionId) {
        var _this = this;
        var proposal = new proposal_1.Proposal(this.id, this.context);
        var observable = proposal.state().pipe(operators_1.first(), operators_1.concatMap(function (competitionState) {
            if (competitionState === null) {
                throw Error("Cannot vote on this suggestion, because the competition with id " + _this.id + " could not be foound");
            }
            var scheme = new CompetitionScheme(competitionState.scheme, _this.context);
            return scheme.voteSuggestion({ suggestionId: suggestionId });
        }));
        return operation_1.toIOperationObservable(observable);
    };
    Competition.prototype.redeemSuggestion = function (suggestionId) {
        var _this = this;
        var proposal = new proposal_1.Proposal(this.id, this.context);
        var observable = proposal.state().pipe(operators_1.first(), operators_1.concatMap(function (competitionState) {
            var scheme = new CompetitionScheme(competitionState.scheme, _this.context);
            return scheme.redeemSuggestion({ suggestionId: suggestionId });
        }));
        return operation_1.toIOperationObservable(observable);
    };
    Competition.prototype.suggestions = function (options, apolloQueryOptions) {
        if (options === void 0) { options = {}; }
        if (apolloQueryOptions === void 0) { apolloQueryOptions = {}; }
        if (!options.where) {
            options.where = {};
        }
        options.where.proposal = this.id;
        return CompetitionSuggestion.search(this.context, options, apolloQueryOptions);
    };
    Competition.prototype.votes = function (options, apolloQueryOptions) {
        if (options === void 0) { options = {}; }
        if (apolloQueryOptions === void 0) { apolloQueryOptions = {}; }
        if (!options.where) {
            options.where = {};
        }
        options.where.proposal = this.id;
        return CompetitionVote.search(this.context, options, apolloQueryOptions);
    };
    return Competition;
}());
exports.Competition = Competition;
var CompetitionSuggestion = /** @class */ (function () {
    function CompetitionSuggestion(idOrOpts, context) {
        this.context = context;
        if (typeof idOrOpts === 'string') {
            this.id = idOrOpts;
        }
        else {
            if (Object.keys(idOrOpts).includes('scheme') &&
                Object.keys(idOrOpts).includes('suggestionId')) {
                this.id = CompetitionSuggestion.calculateId(idOrOpts);
                this.suggestionId = idOrOpts.suggestionId;
            }
            else {
                var opts = idOrOpts;
                this.id = opts.id;
                this.setStaticState(opts);
            }
        }
    }
    CompetitionSuggestion.calculateId = function (opts) {
        var seed = utils_1.concat(utils_1.hexStringToUint8Array(opts.scheme.toLowerCase()), utils_1.hexStringToUint8Array(Number(opts.suggestionId).toString(16)));
        return Web3.utils.keccak256(seed);
    };
    CompetitionSuggestion.search = function (context, options, apolloQueryOptions) {
        var _this = this;
        if (options === void 0) { options = {}; }
        if (apolloQueryOptions === void 0) { apolloQueryOptions = {}; }
        var query;
        var itemMap = function (item) {
            return new CompetitionSuggestion(_this.mapItemToObject(item, context), context);
        };
        // if we are looing for the suggestions of a particular proposal, we prime the cache..
        if (options.where && options.where.proposal && !options.where.id) {
            query = graphql_tag_1.default(templateObject_2 || (templateObject_2 = __makeTemplateObject(["query CompetitionSuggestionSearchByProposal\n        {\n          competitionProposal (id: \"", "\") {\n              suggestions ", " {\n                ...CompetitionSuggestionFields\n              }\n            }\n        }\n        ", "\n      "], ["query CompetitionSuggestionSearchByProposal\n        {\n          competitionProposal (id: \"", "\") {\n              suggestions ", " {\n                ...CompetitionSuggestionFields\n              }\n            }\n        }\n        ", "\n      "])), options.where.proposal, utils_1.createGraphQlQuery({ where: __assign(__assign({}, options.where), { proposal: undefined }) }), CompetitionSuggestion.fragments.CompetitionSuggestionFields);
            return context.getObservableObject(query, function (r) {
                if (r === null) { // no such proposal was found
                    return [];
                }
                return r.suggestions.map(itemMap);
            }, apolloQueryOptions);
        }
        else {
            query = graphql_tag_1.default(templateObject_3 || (templateObject_3 = __makeTemplateObject(["query CompetitionSuggestionSearch\n        {\n          competitionSuggestions ", " {\n            ...CompetitionSuggestionFields\n          }\n        }\n        ", "\n      "], ["query CompetitionSuggestionSearch\n        {\n          competitionSuggestions ", " {\n            ...CompetitionSuggestionFields\n          }\n        }\n        ", "\n      "])), utils_1.createGraphQlQuery(options), CompetitionSuggestion.fragments.CompetitionSuggestionFields);
            return context.getObservableList(query, itemMap, apolloQueryOptions);
        }
    };
    CompetitionSuggestion.mapItemToObject = function (item, context) {
        if (item === null) {
            return null;
        }
        var redeemedAt = null;
        if (item.redeemedAt !== null) {
            redeemedAt = utils_1.secondSinceEpochToDate(item.redeemedAt);
        }
        var positionInWinnerList = null;
        if (item.positionInWinnerList !== null) {
            positionInWinnerList = Number(item.positionInWinnerList);
        }
        return {
            beneficiary: item.beneficiary,
            createdAt: utils_1.secondSinceEpochToDate(item.createdAt),
            description: item.description,
            descriptionHash: item.descriptionHash,
            id: item.id,
            isWinner: positionInWinnerList !== null,
            positionInWinnerList: positionInWinnerList,
            proposal: item.proposal.id,
            redeemedAt: redeemedAt,
            rewardPercentage: Number(item.rewardPercentage),
            suggester: item.suggester,
            suggestionId: item.suggestionId,
            tags: item.tags.map(function (tag) { return tag.id; }),
            title: item.title,
            totalVotes: new BN(item.totalVotes),
            url: item.url
        };
    };
    CompetitionSuggestion.prototype.setStaticState = function (opts) {
        this.staticState = opts;
    };
    CompetitionSuggestion.prototype.fetchStaticState = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.state({ fetchPolicy: 'cache-first' }).pipe(operators_1.first()).toPromise()];
            });
        });
    };
    CompetitionSuggestion.prototype.state = function (apolloQueryOptions) {
        var _this = this;
        if (apolloQueryOptions === void 0) { apolloQueryOptions = {}; }
        var query = graphql_tag_1.default(templateObject_4 || (templateObject_4 = __makeTemplateObject(["query CompetitionSuggestionById\n      {\n        competitionSuggestion (id: \"", "\") {\n          ...CompetitionSuggestionFields\n        }\n      }\n      ", "\n    "], ["query CompetitionSuggestionById\n      {\n        competitionSuggestion (id: \"", "\") {\n          ...CompetitionSuggestionFields\n        }\n      }\n      ", "\n    "])), this.id, CompetitionSuggestion.fragments.CompetitionSuggestionFields);
        var itemMap = function (item) { return CompetitionSuggestion.mapItemToObject(item, _this.context); };
        return this.context.getObservableObject(query, itemMap, apolloQueryOptions);
    };
    CompetitionSuggestion.prototype.vote = function () {
        var _this = this;
        var observable = this.state().pipe(operators_1.first(), operators_1.concatMap(function (suggestionState) {
            var competition = new Competition(suggestionState.proposal, _this.context);
            return competition.voteSuggestion(suggestionState.suggestionId);
        }));
        return operation_1.toIOperationObservable(observable);
    };
    CompetitionSuggestion.prototype.votes = function (options, apolloQueryOptions) {
        if (options === void 0) { options = {}; }
        if (apolloQueryOptions === void 0) { apolloQueryOptions = {}; }
        if (!options.where) {
            options.where = {};
        }
        options.where = __assign(__assign({}, options.where), { suggestion: this.id });
        return CompetitionVote.search(this.context, options, apolloQueryOptions);
    };
    CompetitionSuggestion.prototype.getPosition = function () {
        return __awaiter(this, void 0, void 0, function () {
            var suggestionState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.warn("This method is deprecated - please use the positionInWinnerList from the proposal state");
                        return [4 /*yield*/, this.state().pipe(operators_1.first()).toPromise()];
                    case 1:
                        suggestionState = _a.sent();
                        return [2 /*return*/, suggestionState.positionInWinnerList];
                }
            });
        });
    };
    CompetitionSuggestion.prototype.isWinner = function () {
        return __awaiter(this, void 0, void 0, function () {
            var suggestionState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.warn("This method is deprecated - please use the positionInWinnerList !== from the proposal state");
                        return [4 /*yield*/, this.state().pipe(operators_1.first()).toPromise()];
                    case 1:
                        suggestionState = _a.sent();
                        return [2 /*return*/, suggestionState.isWinner];
                }
            });
        });
    };
    CompetitionSuggestion.prototype.redeem = function () {
        var _this = this;
        var observable = this.state().pipe(operators_1.first(), operators_1.concatMap(function (suggestionState) {
            var competition = new Competition(suggestionState.proposal, _this.context);
            return competition.redeemSuggestion(suggestionState.suggestionId);
        }));
        return operation_1.toIOperationObservable(observable);
    };
    CompetitionSuggestion.fragments = {
        CompetitionSuggestionFields: graphql_tag_1.default(templateObject_5 || (templateObject_5 = __makeTemplateObject(["fragment CompetitionSuggestionFields on CompetitionSuggestion {\n      id\n      suggestionId\n      proposal {\n       id\n      }\n      descriptionHash\n      title\n      description\n      url\n      tags {\n        id\n      }\n      # fulltext: [string]\n      beneficiary\n      suggester\n      # votes: [CompetitionVote!] @derivedFrom(field: \"suggestion\")\n      totalVotes\n      createdAt\n      redeemedAt\n      rewardPercentage\n      positionInWinnerList\n    }"], ["fragment CompetitionSuggestionFields on CompetitionSuggestion {\n      id\n      suggestionId\n      proposal {\n       id\n      }\n      descriptionHash\n      title\n      description\n      url\n      tags {\n        id\n      }\n      # fulltext: [string]\n      beneficiary\n      suggester\n      # votes: [CompetitionVote!] @derivedFrom(field: \"suggestion\")\n      totalVotes\n      createdAt\n      redeemedAt\n      rewardPercentage\n      positionInWinnerList\n    }"])))
    };
    return CompetitionSuggestion;
}());
exports.CompetitionSuggestion = CompetitionSuggestion;
var CompetitionVote = /** @class */ (function () {
    function CompetitionVote(idOrOpts, context) {
        this.context = context;
        if (typeof idOrOpts === 'string') {
            this.id = idOrOpts;
        }
        else {
            var opts = idOrOpts;
            // this.id = opts.id
            this.setStaticState(opts);
        }
    }
    CompetitionVote.search = function (context, options, apolloQueryOptions) {
        if (options === void 0) { options = {}; }
        if (apolloQueryOptions === void 0) { apolloQueryOptions = {}; }
        if (!options.where) {
            options.where = {};
        }
        var itemMap = function (item) {
            return new CompetitionVote(CompetitionVote.itemMap(item), context);
        };
        var query;
        if (options.where.suggestion && !options.where.id) {
            query = graphql_tag_1.default(templateObject_6 || (templateObject_6 = __makeTemplateObject(["query CompetitionVoteSearchBySuggestion\n        {\n          competitionSuggestion (id: \"", "\") {\n            id\n            votes ", " {\n              ...CompetitionVoteFields\n            }\n          }\n        }\n        ", "\n      "], ["query CompetitionVoteSearchBySuggestion\n        {\n          competitionSuggestion (id: \"", "\") {\n            id\n            votes ", " {\n              ...CompetitionVoteFields\n            }\n          }\n        }\n        ", "\n      "])), options.where.suggestion, utils_1.createGraphQlQuery({ where: __assign(__assign({}, options.where), { suggestion: undefined }) }), CompetitionVote.fragments.CompetitionVoteFields);
            return context.getObservableObject(query, function (r) {
                if (r === null) { // no such proposal was found
                    return [];
                }
                return r.votes.map(itemMap);
            }, apolloQueryOptions);
        }
        else {
            query = graphql_tag_1.default(templateObject_7 || (templateObject_7 = __makeTemplateObject(["query CompetitionVoteSearch\n        {\n          competitionVotes ", " {\n            ...CompetitionVoteFields\n          }\n        }\n        ", "\n      "], ["query CompetitionVoteSearch\n        {\n          competitionVotes ", " {\n            ...CompetitionVoteFields\n          }\n        }\n        ", "\n      "])), utils_1.createGraphQlQuery(options), CompetitionVote.fragments.CompetitionVoteFields);
            return context.getObservableList(query, itemMap, apolloQueryOptions);
        }
    };
    CompetitionVote.itemMap = function (item) {
        return {
            createdAt: utils_1.secondSinceEpochToDate(item.createdAt),
            id: item.id,
            proposal: item.proposal.id,
            reputation: item.reputation,
            suggestion: item.suggestion.id,
            voter: item.voter
        };
    };
    CompetitionVote.prototype.setStaticState = function (opts) {
        this.id = opts.id;
        this.staticState = opts;
    };
    CompetitionVote.prototype.state = function (apolloQueryOptions) {
        if (apolloQueryOptions === void 0) { apolloQueryOptions = {}; }
        var query = graphql_tag_1.default(templateObject_8 || (templateObject_8 = __makeTemplateObject(["query CompetitionVoteById\n      {\n        competitionVote (id: \"", "\") {\n          ...CompetitionVoteFields\n        }\n      }\n      ", "\n      "], ["query CompetitionVoteById\n      {\n        competitionVote (id: \"", "\") {\n          ...CompetitionVoteFields\n        }\n      }\n      ", "\n      "])), this.id, CompetitionVote.fragments.CompetitionVoteFields);
        return this.context.getObservableObject(query, CompetitionVote.itemMap, apolloQueryOptions);
    };
    CompetitionVote.fragments = {
        CompetitionVoteFields: graphql_tag_1.default(templateObject_9 || (templateObject_9 = __makeTemplateObject(["fragment CompetitionVoteFields on CompetitionVote {\n      id\n      createdAt\n      reputation\n      voter\n      proposal { id }\n      suggestion { id }\n    }"], ["fragment CompetitionVoteFields on CompetitionVote {\n      id\n      createdAt\n      reputation\n      voter\n      proposal { id }\n      suggestion { id }\n    }"])))
    };
    return CompetitionVote;
}());
exports.CompetitionVote = CompetitionVote;
/**
 * If this scheme is a ContributionREwardExt scheme and if
 * its rewarder is Competition contract, return that contract
 * @param schemeState
 * @returns A Web3 contract instance
 */
function getCompetitionContract(schemeState, arc) {
    if (schemeState === null) {
        throw Error("No scheme was provided");
    }
    var rewarder = schemeState.contributionRewardExtParams && schemeState.contributionRewardExtParams.rewarder;
    if (!rewarder) {
        throw Error("This scheme's rewarder is not set, and so no compeittion contract could be found");
    }
    if (!isCompetitionScheme(arc, schemeState)) {
        throw Error("We did not find a Competition contract at the rewarder address " + rewarder);
    }
    var contract = arc.getContract(rewarder);
    return contract;
}
exports.getCompetitionContract = getCompetitionContract;
function isCompetitionScheme(arc, item) {
    if (item.contributionRewardExtParams) {
        var contractInfo = arc.getContractInfo(item.contributionRewardExtParams.rewarder);
        var versionNumber = Number(contractInfo.version.split('rc.')[1]);
        if (versionNumber < 39) {
            throw Error("Competition contracts of version < 0.0.1-rc.39 are not supported");
        }
        return contractInfo.name === 'Competition';
    }
    else {
        return false;
    }
}
exports.isCompetitionScheme = isCompetitionScheme;
/**
 * @returns true if this is a ContributionRewardExt scheme and the rewarder of this scheme is a competition contract
 */
function hasCompetitionContract(schemeState, arc) {
    var contract;
    try {
        contract = getCompetitionContract(schemeState, arc);
    }
    catch (err) {
        // pass
    }
    return !!contract;
}
exports.hasCompetitionContract = hasCompetitionContract;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9;
//# sourceMappingURL=competition.js.map