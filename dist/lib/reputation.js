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
var settings_1 = require("./settings");
var utils_1 = require("./utils");
var Reputation = /** @class */ (function () {
    function Reputation(id, context) {
        this.id = id;
        this.context = context;
        utils_1.isAddress(id);
        this.address = id;
    }
    /**
     * Reputation.search(context, options) searches for reputation entities
     * @param  context an Arc instance that provides connection information
     * @param  options the query options, cf. IReputationQueryOptions
     * @return         an observable of Reputation objects
     */
    Reputation.search = function (context, options, apolloQueryOptions) {
        if (options === void 0) { options = {}; }
        if (apolloQueryOptions === void 0) { apolloQueryOptions = {}; }
        var where = '';
        if (!options.where) {
            options.where = {};
        }
        for (var _i = 0, _a = Object.keys(options.where); _i < _a.length; _i++) {
            var key = _a[_i];
            if (options[key] === undefined) {
                continue;
            }
            if (key === 'dao') {
                var option = options[key];
                utils_1.isAddress(option);
                options[key] = option.toLowerCase();
            }
            where += key + ": \"" + options[key] + "\"\n";
        }
        var query = graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["query ReputationSearch {\n      reps\n      ", "\n      {\n        id\n      }\n    }"], ["query ReputationSearch {\n      reps\n      ", "\n      {\n        id\n      }\n    }"])), utils_1.createGraphQlQuery(options, where));
        return context.getObservableList(query, function (r) { return new Reputation(r.id, context); }, apolloQueryOptions);
    };
    Reputation.prototype.state = function (apolloQueryOptions) {
        var _this = this;
        if (apolloQueryOptions === void 0) { apolloQueryOptions = {}; }
        var query = graphql_tag_1.default(templateObject_2 || (templateObject_2 = __makeTemplateObject(["query ReputationState\n    {\n      rep (id: \"", "\") {\n        id\n        totalSupply\n        dao {\n          id\n        }\n      }\n    }"], ["query ReputationState\n    {\n      rep (id: \"", "\") {\n        id\n        totalSupply\n        dao {\n          id\n        }\n      }\n    }"])), this.address.toLowerCase());
        var itemMap = function (item) {
            if (item === null) {
                throw Error("Could not find a reputation contract with address " + _this.address.toLowerCase());
            }
            return {
                address: item.id,
                dao: item.dao.id,
                totalSupply: new BN(item.totalSupply)
            };
        };
        return this.context.getObservableObject(query, itemMap, apolloQueryOptions);
    };
    Reputation.prototype.reputationOf = function (address) {
        utils_1.isAddress(address);
        var query = graphql_tag_1.default(templateObject_3 || (templateObject_3 = __makeTemplateObject(["query ReputationHolderReputation {\n      reputationHolders (\n        where: { address:\"", "\",\n        contract: \"", "\"}\n      )\n      {\n        id, address, balance,contract\n      }\n    }"], ["query ReputationHolderReputation {\n      reputationHolders (\n        where: { address:\"", "\",\n        contract: \"", "\"}\n      )\n      {\n        id, address, balance,contract\n      }\n    }"])), address, this.address);
        return this.context.getObservable(query).pipe(operators_1.map(function (r) { return r.data.reputationHolders; }), operators_1.map(function (items) {
            var item = items.length > 0 && items[0];
            return item.balance !== undefined ? new BN(item.balance) : new BN(0);
        }));
    };
    /*
     * get a web3 contract instance for this token
     */
    Reputation.prototype.contract = function () {
        var abi = this.context.getABI(undefined, 'Reputation', settings_1.REPUTATION_CONTRACT_VERSION);
        return this.context.getContract(this.address, abi);
    };
    Reputation.prototype.mint = function (beneficiary, amount) {
        var _this = this;
        var contract = this.contract();
        var transaction = contract.methods.mint(beneficiary, amount.toString());
        var mapReceipt = function (receipt) { return receipt; };
        var sender = this.context.web3.eth.accounts.wallet[0].address;
        var errHandler = function (err) { return __awaiter(_this, void 0, void 0, function () {
            var owner;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, contract.methods.owner().call()];
                    case 1:
                        owner = _a.sent();
                        if (owner.toLowerCase() !== sender.toLowerCase()) {
                            return [2 /*return*/, Error("Minting failed: sender " + sender + " is not the owner of the contract at " + contract._address +
                                    ("(which is " + owner + ")"))];
                        }
                        return [4 /*yield*/, transaction.call()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, err];
                }
            });
        }); };
        return this.context.sendTransaction(transaction, mapReceipt, errHandler);
    };
    return Reputation;
}());
exports.Reputation = Reputation;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=reputation.js.map