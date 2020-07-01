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
var BN = require("bn.js");
var graphql_tag_1 = require("graphql-tag");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var dao_1 = require("./dao");
var graphnode_1 = require("./graphnode");
var event_1 = require("./event");
var ipfsClient_1 = require("./ipfsClient");
var logger_1 = require("./logger");
var operation_1 = require("./operation");
var proposal_1 = require("./proposal");
var reward_1 = require("./reward");
var scheme_1 = require("./scheme");
var settings_1 = require("./settings");
var stake_1 = require("./stake");
var tag_1 = require("./tag");
var token_1 = require("./token");
var utils_1 = require("./utils");
var Web3 = require('web3');
/**
 * The Arc class holds all configuration.
 * Any useage of the library typically will start with instantiating a new Arc instance
 * @return an instance of Arc
 */
var Arc = /** @class */ (function (_super) {
    __extends(Arc, _super);
    function Arc(options) {
        var _this = _super.call(this, {
            errHandler: options.graphqlErrHandler,
            graphqlHttpProvider: options.graphqlHttpProvider,
            graphqlSubscribeToQueries: options.graphqlSubscribeToQueries,
            graphqlWsProvider: options.graphqlWsProvider,
            prefetchHook: options.graphqlPrefetchHook,
            retryLink: options.graphqlRetryLink
        }) || this;
        _this.web3Provider = '';
        _this.web3ProviderRead = '';
        _this.pendingOperations = rxjs_1.of();
        _this.contracts = {}; // a cache for the contracts
        _this.contractsR = {}; // a cache for teh "read-only" contracts
        // accounts observed by ethBalance
        _this.blockHeaderSubscription = undefined;
        _this.observedAccounts = {};
        _this.ipfsProvider = options.ipfsProvider || '';
        if (options.web3Provider) {
            _this.web3 = new Web3(options.web3Provider);
        }
        if (options.web3ProviderRead) {
            _this.web3Read = new Web3(options.web3ProviderRead);
        }
        else {
            _this.web3Read = _this.web3;
        }
        _this.contractInfos = options.contractInfos || [];
        if (!_this.contractInfos) {
            logger_1.Logger.warn('No contract addresses given to the Arc.constructor: expect most write operations to fail!');
        }
        if (_this.ipfsProvider) {
            _this.ipfs = new ipfsClient_1.IPFSClient(_this.ipfsProvider);
        }
        // by default, we subscribe to queries
        if (options.graphqlSubscribeToQueries === undefined) {
            options.graphqlSubscribeToQueries = true;
        }
        return _this;
    }
    /**
     * set the contract addresses
     * @param  contractInfos a list of IContractInfo objects
     * @return
     */
    Arc.prototype.setContractInfos = function (contractInfos) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // reset the cache
                this.contracts = {};
                this.contractsR = {};
                this.contractInfos = contractInfos;
                return [2 /*return*/];
            });
        });
    };
    /**
     * fetch contractInfos from the subgraph
     * @return a list of IContractInfo instances
     */
    Arc.prototype.fetchContractInfos = function (apolloQueryOptions) {
        if (apolloQueryOptions === void 0) { apolloQueryOptions = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var query, response, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["query AllContractInfos {\n      contractInfos (first: 1000) {\n        id\n        name\n        version\n        address\n      }\n    }"], ["query AllContractInfos {\n      contractInfos (first: 1000) {\n        id\n        name\n        version\n        address\n      }\n    }"
                            // const result = await this.getObservableList(query, itemMap, apolloQueryOptions).pipe(first()).toPromise()
                        ])));
                        return [4 /*yield*/, this.sendQuery(query, apolloQueryOptions)];
                    case 1:
                        response = _a.sent();
                        result = response.data.contractInfos;
                        this.setContractInfos(result);
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * get a DAO instance from an address
     * @param  address address of the dao Avatar
     * @return an instance of a DAO
     */
    Arc.prototype.dao = function (address) {
        utils_1.isAddress(address);
        return new dao_1.DAO(address, this);
    };
    /**
     * return an observable of the list of DAOs
     * @param options options to pass on to the query
     * @return [description]
     */
    Arc.prototype.daos = function (options, apolloQueryOptions) {
        if (options === void 0) { options = {}; }
        if (apolloQueryOptions === void 0) { apolloQueryOptions = {}; }
        return dao_1.DAO.search(this, options, apolloQueryOptions);
    };
    Arc.prototype.tags = function (options, apolloQueryOptions) {
        if (options === void 0) { options = {}; }
        if (apolloQueryOptions === void 0) { apolloQueryOptions = {}; }
        return tag_1.Tag.search(this, options, apolloQueryOptions);
    };
    Arc.prototype.scheme = function (id) {
        return new scheme_1.Scheme(id, this);
    };
    Arc.prototype.schemes = function (options, apolloQueryOptions) {
        if (options === void 0) { options = {}; }
        if (apolloQueryOptions === void 0) { apolloQueryOptions = {}; }
        return scheme_1.Scheme.search(this, options, apolloQueryOptions);
    };
    Arc.prototype.proposal = function (id) {
        return new proposal_1.Proposal(id, this);
    };
    Arc.prototype.proposals = function (options, apolloQueryOptions) {
        if (options === void 0) { options = {}; }
        if (apolloQueryOptions === void 0) { apolloQueryOptions = {}; }
        return proposal_1.Proposal.search(this, options, apolloQueryOptions);
    };
    Arc.prototype.events = function (options, apolloQueryOptions) {
        if (options === void 0) { options = {}; }
        if (apolloQueryOptions === void 0) { apolloQueryOptions = {}; }
        return event_1.Event.search(this, options, apolloQueryOptions);
    };
    Arc.prototype.rewards = function (options, apolloQueryOptions) {
        if (options === void 0) { options = {}; }
        if (apolloQueryOptions === void 0) { apolloQueryOptions = {}; }
        return reward_1.Reward.search(this, options, apolloQueryOptions);
    };
    Arc.prototype.stakes = function (options, apolloQueryOptions) {
        if (options === void 0) { options = {}; }
        if (apolloQueryOptions === void 0) { apolloQueryOptions = {}; }
        return stake_1.Stake.search(this, options, apolloQueryOptions);
    };
    Arc.prototype.ethBalance = function (owner) {
        var _this = this;
        if (!this.observedAccounts[owner]) {
            this.observedAccounts[owner] = {
                subscriptionsCount: 1
            };
        }
        if (this.observedAccounts[owner].observable) {
            this.observedAccounts[owner].subscriptionsCount += 1;
            return this.observedAccounts[owner].observable;
        }
        var observable = rxjs_1.Observable.create(function (observer) {
            _this.observedAccounts[owner].observer = observer;
            // get the current balance and return it
            _this.web3Read.eth.getBalance(owner)
                .then(function (currentBalance) {
                var accInfo = _this.observedAccounts[owner];
                accInfo.observer.next(new BN(currentBalance));
                accInfo.lastBalance = currentBalance;
            })
                .catch(function (err) { return observer.error(err); });
            // set up the blockheadersubscription if it does not exist yet
            if (!_this.blockHeaderSubscription) {
                var subscribeToBlockHeaders = function () {
                    _this.blockHeaderSubscription = _this.web3Read.eth.subscribe('newBlockHeaders', function (err) { return __awaiter(_this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            Object.keys(this.observedAccounts).forEach(function (addr) { return __awaiter(_this, void 0, void 0, function () {
                                var accInfo, balance, err_1;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            accInfo = this.observedAccounts[addr];
                                            if (!err) return [3 /*break*/, 1];
                                            accInfo.observer.error(err);
                                            return [3 /*break*/, 4];
                                        case 1:
                                            _a.trys.push([1, 3, , 4]);
                                            return [4 /*yield*/, this.web3Read.eth.getBalance(addr)];
                                        case 2:
                                            balance = _a.sent();
                                            if (balance !== accInfo.lastBalance) {
                                                accInfo.observer.next(new BN(balance));
                                                accInfo.lastBalance = balance;
                                            }
                                            return [3 /*break*/, 4];
                                        case 3:
                                            err_1 = _a.sent();
                                            observer.error(err_1);
                                            return [3 /*break*/, 4];
                                        case 4: return [2 /*return*/];
                                    }
                                });
                            }); });
                            return [2 /*return*/];
                        });
                    }); });
                };
                try {
                    subscribeToBlockHeaders();
                }
                catch (err) {
                    if (err.message.match(/connection not open/g)) {
                        // we need to re-establish the connection and then resubscribe
                        _this.web3.setProvider(_this.web3Provider);
                        subscribeToBlockHeaders();
                    }
                    throw err;
                }
            }
            // unsubscribe
            return function () {
                _this.observedAccounts[owner].subscriptionsCount -= 1;
                if (_this.observedAccounts[owner].subscriptionsCount <= 0) {
                    delete _this.observedAccounts[owner];
                }
                if (Object.keys(_this.observedAccounts).length === 0 && _this.blockHeaderSubscription) {
                    _this.blockHeaderSubscription.unsubscribe();
                    _this.blockHeaderSubscription = undefined;
                }
            };
        });
        this.observedAccounts[owner].observable = observable;
        return observable
            .pipe(operators_1.map(function (item) { return new BN(item); }));
    };
    /**
     * return information about the contract
     * @param  address [description]
     * @return      an IContractInfo instance
     */
    Arc.prototype.getContractInfo = function (address) {
        utils_1.isAddress(address);
        for (var _i = 0, _a = this.contractInfos; _i < _a.length; _i++) {
            var contractInfo = _a[_i];
            if (contractInfo.address.toLowerCase() === address.toLowerCase()) {
                return contractInfo;
            }
        }
        if (!this.contractInfos) {
            throw Error("no contract info was found - did you call \"arc.setContractInfos()\"?");
        }
        throw Error("No contract with address " + address + " is known");
    };
    Arc.prototype.getContractInfoByName = function (name, version) {
        for (var _i = 0, _a = this.contractInfos; _i < _a.length; _i++) {
            var contractInfo = _a[_i];
            if (contractInfo.name === name && contractInfo.version === version) {
                return contractInfo;
            }
        }
        if (!this.contractInfos) {
            throw Error("no contract info was found - did you call \"arc.setContractInfos(...)\"?");
        }
        throw Error("No contract with name " + name + "  and version " + version + " is known");
    };
    Arc.prototype.getABI = function (address, abiName, version) {
        if (address && !abiName || !version) {
            var contractInfo = this.getContractInfo(address);
            abiName = contractInfo.name;
            version = contractInfo.version;
            if (abiName === 'GEN') {
                abiName = 'ERC20';
            }
        }
        // TODO: workaround for https://github.com/daostack/subgraph/pull/336
        if (abiName === 'UGenericScheme') {
            var versionNumber = Number(version.split('rc.')[1]);
            if (versionNumber < 24) {
                abiName = 'GenericScheme';
            }
        }
        // //End of workaround
        var artefact = require(settings_1.ABI_DIR + "/" + version + "/" + abiName + ".json");
        if (artefact.rootVersion) {
            artefact = require(settings_1.ABI_DIR + "/" + artefact.rootVersion + "/" + abiName + ".json");
        }
        return artefact.abi;
    };
    /**
     * return a web3 Contract instance.
     * @param  address address of the contract to look up in self.contractInfos
     * @param  [abiName] (optional) name of the ABI (i.e. 'Avatar' or 'SchemeRegistrar').
     * @param  [version] (optional) Arc version of contract (https://www.npmjs.com/package/@daostack/arc)
     * @return   a web3 contract instance
     */
    Arc.prototype.getContract = function (address, abi, mode) {
        // we use a contract "cache" because web3 contract instances add an event listener
        var readonlyContract = (mode === 'readonly' && this.web3Read !== this.web3);
        if (readonlyContract && this.contractsR[address]) {
            return this.contractsR[address];
        }
        else if (this.contracts[address]) {
            return this.contracts[address];
        }
        else {
            if (!abi) {
                abi = this.getABI(address);
            }
            var contract = void 0;
            if (readonlyContract) {
                contract = new this.web3Read.eth.Contract(abi, address);
                this.contractsR[address] = contract;
            }
            else {
                contract = new this.web3.eth.Contract(abi, address);
                this.contracts[address] = contract;
            }
            return contract;
        }
    };
    /**
     * get the GEN Token
     * @return a Token instance
     */
    Arc.prototype.GENToken = function () {
        if (this.contractInfos) {
            for (var _i = 0, _a = this.contractInfos; _i < _a.length; _i++) {
                var contractInfo = _a[_i];
                if (contractInfo.name === 'GEN') {
                    return new token_1.Token(contractInfo.address, this);
                }
            }
            throw Error("Cannot find address of GEN Token - did you call setContractInfos?");
        }
        else {
            throw Error("No contract addresses known - did you run arc.setContractInfos()?");
        }
    };
    Arc.prototype.getAccount = function () {
        var _this = this;
        // this complex logic is to get the correct account both from the Web3 as well as from the Metamaask provider
        // This polls for changes. But polling is Evil!
        // cf. https://github.com/MetaMask/faq/blob/master/DEVELOPERS.md#ear-listening-for-selected-account-changes
        return rxjs_1.Observable.create(function (observer) {
            var interval = 1000; /// poll once a second
            var account;
            var prevAccount;
            var web3 = _this.web3;
            if (web3.eth.accounts[0]) {
                observer.next(web3.eth.accounts[0].address);
                prevAccount = web3.eth.accounts[0].address;
            }
            else if (web3.eth.defaultAccount) {
                observer.next(web3.eth.defaultAccount);
                prevAccount = web3.eth.defaultAccount;
            }
            var timeout = setInterval(function () {
                web3.eth.getAccounts().then(function (accounts) {
                    if (accounts) {
                        account = accounts[0];
                    }
                    else if (web3.eth.accounts) {
                        account = web3.eth.accounts[0].address;
                    }
                    if (prevAccount !== account && account) {
                        web3.eth.defaultAccount = account;
                        observer.next(account);
                        prevAccount = account;
                    }
                });
            }, interval);
            return function () { return clearTimeout(timeout); };
        });
    };
    Arc.prototype.setAccount = function (address) {
        this.web3.eth.defaultAccount = address;
    };
    Arc.prototype.approveForStaking = function (spender, amount) {
        return this.GENToken().approveForStaking(spender, amount);
    };
    /**
     * How much GEN spender may spend on behalve of the owner
     * @param  owner Address of the owner of the tokens
     * @param  spender Address of the spender
     * @return
     */
    Arc.prototype.allowance = function (owner, spender) {
        return this.GENToken().allowance(owner, spender);
    };
    /**
     * send an Ethereum transaction
     * @param  transaction  [description]
     * @param  mapToObject  [description]
     * @param  errorHandler [description]
     * @return  An observable of
     */
    Arc.prototype.sendTransaction = function (transaction, mapToObject, errorHandler) {
        return operation_1.sendTransaction(this, transaction, mapToObject, errorHandler);
    };
    /**
     * save data of a proposal to IPFS, return  the IPFS hash
     * @param  options an Object to save. This object must have title, url and desction defined
     * @return  a Promise that resolves in the IPFS Hash where the file is saved
     */
    Arc.prototype.saveIPFSData = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var ipfsDataToSave, descriptionHash, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ipfsDataToSave = {};
                        if (options.title || options.url || options.description || options.tags !== undefined) {
                            if (!this.ipfsProvider) {
                                throw Error("No ipfsProvider set on Arc instance - cannot save data on IPFS");
                            }
                            ipfsDataToSave = {
                                description: options.description,
                                tags: options.tags,
                                title: options.title,
                                url: options.url
                            };
                        }
                        logger_1.Logger.debug('Saving data on IPFS...');
                        descriptionHash = '';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.ipfs.addString(JSON.stringify(ipfsDataToSave))
                            // pin the file
                        ];
                    case 2:
                        descriptionHash = _a.sent();
                        // pin the file
                        return [4 /*yield*/, this.ipfs.pinHash(descriptionHash)];
                    case 3:
                        // pin the file
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        throw error_1;
                    case 5:
                        logger_1.Logger.debug("Data saved successfully as " + descriptionHash);
                        return [2 /*return*/, descriptionHash];
                }
            });
        });
    };
    return Arc;
}(graphnode_1.GraphNodeObserver));
exports.Arc = Arc;
var templateObject_1;
//# sourceMappingURL=arc.js.map