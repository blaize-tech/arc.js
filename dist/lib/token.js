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
var settings_1 = require("./settings");
var utils_1 = require("./utils");
var Token = /** @class */ (function () {
    function Token(id, context) {
        this.id = id;
        this.context = context;
        if (!id) {
            throw Error("No address provided - cannot create Token instance");
        }
        utils_1.isAddress(id);
        this.address = id;
    }
    /**
     * Token.search(context, options) searches for token entities
     * @param  context an Arc instance that provides connection information
     * @param  options the query options, cf. ITokenQueryOptions
     * @return         an observable of Token objects
     */
    Token.search = function (context, options, apolloQueryOptions) {
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
            if (key === 'token' || key === 'owner' || key === 'spender') {
                var option = options[key];
                utils_1.isAddress(option);
                options[key] = option.toLowerCase();
            }
            where += key + ": \"" + options[key] + "\"\n";
        }
        var query = graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["query TokenSearch\n    {\n      tokens ", " {\n        id\n      }\n    }"], ["query TokenSearch\n    {\n      tokens ", " {\n        id\n      }\n    }"])), utils_1.createGraphQlQuery(options, where));
        return context.getObservableList(query, function (r) { return new Token(r.id, context); }, apolloQueryOptions);
    };
    Token.prototype.state = function (apolloQueryOptions) {
        var _this = this;
        if (apolloQueryOptions === void 0) { apolloQueryOptions = {}; }
        var query = graphql_tag_1.default(templateObject_2 || (templateObject_2 = __makeTemplateObject(["query tokenState {\n      token(id: \"", "\") {\n        id,\n        dao {\n          id\n        },\n        name,\n        symbol,\n        totalSupply\n      }\n    }"], ["query tokenState {\n      token(id: \"", "\") {\n        id,\n        dao {\n          id\n        },\n        name,\n        symbol,\n        totalSupply\n      }\n    }"])), this.address.toLowerCase());
        var itemMap = function (item) {
            if (item === null) {
                throw Error("Could not find a token contract with address " + _this.address.toLowerCase());
            }
            return {
                address: item.id,
                name: item.name,
                owner: item.dao.id,
                symbol: item.symbol,
                totalSupply: new BN(item.totalSupply)
            };
        };
        return this.context.getObservableObject(query, itemMap, apolloQueryOptions);
    };
    /*
     * get a web3 contract instance for this token
     */
    Token.prototype.contract = function (mode) {
        var abi = this.context.getABI(undefined, "DAOToken", settings_1.DAOTOKEN_CONTRACT_VERSION);
        return this.context.getContract(this.address, abi, mode);
    };
    Token.prototype.balanceOf = function (owner) {
        var _this = this;
        var errHandler = function (err) { return __awaiter(_this, void 0, void 0, function () {
            var code;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!err.message.match(/Returned values aren't valid/g)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.context.web3.eth.getCode(this.address)];
                    case 1:
                        code = _a.sent();
                        if (code === '0x') {
                            return [2 /*return*/, new Error("Cannot get balanceOf(): there is no contract at this address " + this.address)];
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/, err];
                }
            });
        }); };
        var observable = rxjs_1.Observable.create(function (observer) { return __awaiter(_this, void 0, void 0, function () {
            var contract, subscriptionReceive, subscriptionSend, unsubscribe, subscribe;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        contract = this.contract('readonly');
                        unsubscribe = function () {
                            if (subscriptionReceive) {
                                subscriptionReceive.unsubscribe();
                            }
                            if (subscriptionSend) {
                                subscriptionSend.unsubscribe();
                            }
                        };
                        subscribe = function () { return contract.methods.balanceOf(owner).call()
                            .then(function (balance) {
                            if (balance === null) {
                                observer.error("balanceOf " + owner + " returned null");
                            }
                            observer.next(new BN(balance));
                            subscriptionReceive = contract.events.Transfer({ filter: { to: owner } })
                                .on('data', function (data) {
                                contract.methods.balanceOf(owner).call().then(function (newBalance) {
                                    observer.next(new BN(newBalance));
                                });
                            });
                            subscriptionSend = contract.events.Transfer({ filter: { from: owner } })
                                .on('data', function (data) {
                                contract.methods.balanceOf(owner).call().then(function (newBalance) {
                                    observer.next(new BN(newBalance));
                                });
                            });
                        })
                            .catch(function (err) { return __awaiter(_this, void 0, void 0, function () {
                            var _a, _b, _c, _d;
                            return __generator(this, function (_e) {
                                switch (_e.label) {
                                    case 0:
                                        if (!err.message.match(/connection not open/g)) return [3 /*break*/, 2];
                                        _b = (_a = observer).error;
                                        return [4 /*yield*/, errHandler(err)];
                                    case 1:
                                        _b.apply(_a, [_e.sent()]);
                                        return [3 /*break*/, 4];
                                    case 2:
                                        _d = (_c = observer).error;
                                        return [4 /*yield*/, errHandler(err)];
                                    case 3:
                                        _d.apply(_c, [_e.sent()]);
                                        _e.label = 4;
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); }); };
                        return [4 /*yield*/, subscribe()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, function () { return unsubscribe(); }];
                }
            });
        }); });
        observable.first = function () { return observable.pipe(operators_1.first()).toPromise(); };
        return observable;
    };
    Token.prototype.allowance = function (owner, spender) {
        var _this = this;
        return rxjs_1.Observable.create(function (observer) { return __awaiter(_this, void 0, void 0, function () {
            var subscription, contract;
            return __generator(this, function (_a) {
                contract = this.contract('readonly');
                contract.methods.allowance(owner, spender).call()
                    .then(function (balance) {
                    if (balance === null) {
                        observer.error("balanceOf " + owner + " returned null");
                    }
                    observer.next(new BN(balance));
                    subscription = contract.events.Approval({ filter: { _owner: owner } })
                        .on('data', function () {
                        // const newBalance = data.returnValues.value
                        contract.methods.allowance(owner, spender).call().then(function (newBalance) {
                            observer.next(new BN(newBalance));
                        });
                    });
                })
                    .catch(function (err) { observer.error(err); });
                return [2 /*return*/, function () {
                        if (subscription) {
                            subscription.unsubscribe();
                        }
                    }];
            });
        }); });
    };
    Token.prototype.mint = function (beneficiary, amount) {
        var contract = this.contract();
        var transaction = contract.methods.mint(beneficiary, amount.toString());
        var mapReceipt = function (receipt) { return receipt; };
        return this.context.sendTransaction(transaction, mapReceipt);
    };
    Token.prototype.transfer = function (beneficiary, amount) {
        var contract = this.contract();
        var transaction = contract.methods.transfer(beneficiary, amount.toString());
        var mapReceipt = function (receipt) { return receipt; };
        return this.context.sendTransaction(transaction, mapReceipt);
    };
    Token.prototype.approveForStaking = function (spender, amount) {
        var stakingToken = this.contract();
        var transaction = stakingToken.methods.approve(spender, amount.toString());
        var mapReceipt = function (receipt) { return receipt; };
        return this.context.sendTransaction(transaction, mapReceipt);
    };
    return Token;
}());
exports.Token = Token;
var templateObject_1, templateObject_2;
//# sourceMappingURL=token.js.map