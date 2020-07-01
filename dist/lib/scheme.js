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
var genesisProtocol_1 = require("./genesisProtocol");
var operation_1 = require("./operation");
var proposal_1 = require("./proposal");
var base_1 = require("./schemes/base");
var competition_1 = require("./schemes/competition");
var Competition = require("./schemes/competition");
var ContributionReward = require("./schemes/contributionReward");
var ContributionRewardExt = require("./schemes/contributionRewardExt");
var GenericScheme = require("./schemes/genericScheme");
var reputationFromToken_1 = require("./schemes/reputationFromToken");
var SchemeRegistrar = require("./schemes/schemeRegistrar");
var UGenericScheme = require("./schemes/uGenericScheme");
var utils_1 = require("./utils");
/**
 * A Scheme represents a scheme instance that is registered at a DAO
 */
var Scheme = /** @class */ (function (_super) {
    __extends(Scheme, _super);
    function Scheme(idOrOpts, context) {
        var _this = _super.call(this, idOrOpts, context) || this;
        _this.context = context;
        _this.staticState = null;
        _this.ReputationFromToken = null;
        _this.context = context;
        if (typeof idOrOpts === 'string') {
            _this.id = idOrOpts;
            _this.id = _this.id.toLowerCase();
        }
        else {
            _this.setStaticState(idOrOpts);
            _this.id = _this.staticState.id;
        }
        return _this;
    }
    /**
     * Scheme.search(context, options) searches for scheme entities
     * @param  context an Arc instance that provides connection information
     * @param  options the query options, cf. ISchemeQueryOptions
     * @return         an observable of Scheme objects
     */
    Scheme.search = function (context, options, apolloQueryOptions) {
        if (options === void 0) { options = {}; }
        if (apolloQueryOptions === void 0) { apolloQueryOptions = {}; }
        var query;
        if (apolloQueryOptions.fetchAllData === true) {
            query = graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["query SchemeSearchAllData {\n        controllerSchemes ", "\n        {\n          ...SchemeFields\n        }\n      }\n      ", ""], ["query SchemeSearchAllData {\n        controllerSchemes ", "\n        {\n          ...SchemeFields\n        }\n      }\n      ", ""])), utils_1.createGraphQlQuery(options), base_1.SchemeBase.fragments.SchemeFields);
        }
        else {
            query = graphql_tag_1.default(templateObject_2 || (templateObject_2 = __makeTemplateObject(["query SchemeSearch {\n        controllerSchemes ", "\n        {\n            id\n            address\n            name\n            dao { id }\n            paramsHash\n            version\n            contributionRewardExtParams {\n              id\n              rewarder\n            }\n        }\n      }"], ["query SchemeSearch {\n        controllerSchemes ", "\n        {\n            id\n            address\n            name\n            dao { id }\n            paramsHash\n            version\n            contributionRewardExtParams {\n              id\n              rewarder\n            }\n        }\n      }"])), utils_1.createGraphQlQuery(options));
        }
        var itemMap = function (item) {
            if (!options.where) {
                options.where = {};
            }
            if (competition_1.isCompetitionScheme(context, item)) {
                return new Competition.CompetitionScheme({
                    address: item.address,
                    dao: item.dao.id,
                    id: item.id,
                    name: item.name,
                    paramsHash: item.paramsHash,
                    version: item.version
                }, context);
            }
            else {
                var scheme = new Scheme({
                    address: item.address,
                    dao: item.dao.id,
                    id: item.id,
                    name: item.name,
                    paramsHash: item.paramsHash,
                    version: item.version
                }, context);
                return scheme;
            }
        };
        return context.getObservableList(query, itemMap, apolloQueryOptions);
    };
    /**
     * map an apollo query result to ISchemeState
     *
     * @static
     * @param {*} item
     * @param {Arc} arc
     * @returns {(ISchemeState|null)}
     * @memberof Scheme
     */
    Scheme.itemMap = function (item, arc) {
        if (!item) {
            return null;
        }
        var name = item.name;
        if (!name) {
            try {
                name = arc.getContractInfo(item.address).name;
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
    Scheme.prototype.setStaticState = function (opts) {
        this.staticState = opts;
        if (this.staticState.name === 'ReputationFromToken') {
            this.ReputationFromToken = new reputationFromToken_1.ReputationFromTokenScheme(this);
        }
    };
    /**
     * fetch the static state from the subgraph
     * @return the statatic state
     */
    Scheme.prototype.fetchStaticState = function () {
        return __awaiter(this, void 0, void 0, function () {
            var state, opts;
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
                        opts = {
                            address: state.address,
                            dao: state.dao,
                            id: this.id,
                            name: state.name,
                            paramsHash: state.paramsHash,
                            version: state.version
                        };
                        this.setStaticState(opts);
                        return [2 /*return*/, state];
                }
            });
        });
    };
    Scheme.prototype.state = function (apolloQueryOptions) {
        var _this = this;
        if (apolloQueryOptions === void 0) { apolloQueryOptions = {}; }
        var query = graphql_tag_1.default(templateObject_3 || (templateObject_3 = __makeTemplateObject(["query SchemeStateById\n      {\n        controllerScheme (id: \"", "\") {\n          ...SchemeFields\n        }\n      }\n      ", "\n    "], ["query SchemeStateById\n      {\n        controllerScheme (id: \"", "\") {\n          ...SchemeFields\n        }\n      }\n      ", "\n    "])), this.id, base_1.SchemeBase.fragments.SchemeFields);
        var itemMap = function (item) { return Scheme.itemMap(item, _this.context); };
        return this.context.getObservableObject(query, itemMap, apolloQueryOptions);
    };
    /**
     * create a new proposal in this Scheme
     * @param  options [description ]
     * @return a Proposal instance
     */
    Scheme.prototype.createProposal = function (options) {
        var _this = this;
        var observable = rxjs_1.Observable.create(function (observer) { return __awaiter(_this, void 0, void 0, function () {
            var msg, context, createTransaction, map, state, competitionScheme, versionNumber, sendTransactionObservable, sub;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        context = this.context;
                        createTransaction = function () { return null; };
                        return [4 /*yield*/, this.fetchStaticState()];
                    case 1:
                        state = _a.sent();
                        switch (state.name) {
                            case 'ContributionReward':
                                createTransaction = ContributionReward.createProposal(options, this.context);
                                map = ContributionReward.createTransactionMap(options, this.context);
                                break;
                            case 'ContributionRewardExt':
                                // TODO: ContributionRewardExt can also be used to create a Competition proposal
                                // For now, we explicitly pass this in the options, but in reality (once 36-4 is released) we
                                // should be able to sniff this: if the rewarder of the scheme is a Contribution.sol instance....
                                if (options.proposalType === 'competition') {
                                    competitionScheme = new competition_1.CompetitionScheme(this.id, this.context);
                                    return [2 /*return*/, competitionScheme.createProposal(options)
                                        // createTransaction = competitionScheme.createProposal(options, this.context)
                                        // map = Competition.createTransactionMap(options, this.context),
                                        // errHandler = Competition.createProposalErrorHandler
                                    ];
                                    // createTransaction = competitionScheme.createProposal(options, this.context)
                                    // map = Competition.createTransactionMap(options, this.context),
                                    // errHandler = Competition.createProposalErrorHandler
                                }
                                else {
                                    createTransaction = ContributionRewardExt.createProposal(options, this.context);
                                    map = ContributionRewardExt.createTransactionMap(options, this.context);
                                }
                                break;
                            case 'UGenericScheme':
                                createTransaction = UGenericScheme.createTransaction(options, this.context);
                                map = UGenericScheme.createTransactionMap(options, this.context);
                                break;
                            case 'GenericScheme':
                                versionNumber = Number(state.version.split('rc.')[1]);
                                if (versionNumber < 23) {
                                    // the pre-24 " GenericScheme" contracts have beeen renamed to UGenericScheme
                                    createTransaction = UGenericScheme.createTransaction(options, this.context);
                                    map = UGenericScheme.createTransactionMap(options, this.context);
                                    break;
                                }
                                else {
                                    createTransaction = GenericScheme.createTransaction(options, this.context);
                                    map = GenericScheme.createTransactionMap(options, this.context);
                                    break;
                                }
                            case 'SchemeRegistrar':
                                createTransaction = SchemeRegistrar.createTransaction(options, this.context);
                                map = SchemeRegistrar.createTransactionMap(options, this.context);
                                break;
                            default:
                                msg = "Unknown proposal scheme: '" + state.name + "'";
                                msg = state.name + " " + (state.name === 'ContributionRewardExt');
                                throw Error(msg);
                        }
                        sendTransactionObservable = context.sendTransaction(createTransaction, map);
                        sub = sendTransactionObservable.subscribe(observer);
                        return [2 /*return*/, function () { return sub.unsubscribe(); }];
                }
            });
        }); });
        return operation_1.toIOperationObservable(observable);
    };
    Scheme.prototype.proposals = function (options, apolloQueryOptions) {
        if (options === void 0) { options = {}; }
        if (apolloQueryOptions === void 0) { apolloQueryOptions = {}; }
        if (!options.where) {
            options.where = {};
        }
        options.where.scheme = this.id;
        return proposal_1.Proposal.search(this.context, options, apolloQueryOptions);
    };
    return Scheme;
}(base_1.SchemeBase));
exports.Scheme = Scheme;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=scheme.js.map