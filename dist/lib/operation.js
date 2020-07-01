"use strict";
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
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var logger_1 = require("./logger");
var ITransactionState;
(function (ITransactionState) {
    ITransactionState[ITransactionState["Sending"] = 0] = "Sending";
    ITransactionState[ITransactionState["Sent"] = 1] = "Sent";
    ITransactionState[ITransactionState["Mined"] = 2] = "Mined";
})(ITransactionState = exports.ITransactionState || (exports.ITransactionState = {}));
/**
 *
 *  * send a transaction to the ethereumblockchain, and return a observable of ITransactionUpdatessend
 * for example:
 *  ```sendTransaction(.....).subscribe((txUpdate) => {
 *    if (txUpdate.state === 'sent' ) { notify("your transaction has been sent, waitin'for it to be mnied") }
 *    if (txUpdate.state === 'mined'} {
 *      notify("your transaction has been mined! It was confirmed ${txUpdate.confirmations} times"}
 *      // and we also ahve the txUpdate.receipt and the txUpdate.result to do stuff with
 *    }
 *  })```
 *
 * @export
 * @template T
 * @param {Arc} context An instance of Arc
 * @param {*} transaction A Web3 transaction object to send
 * @param {((receipt: web3receipt) => T | Promise<T>)} mapReceipt A function that takes the receipt of
 *  the transaction and returns an object
 * @param {((error: Error, transaction: any, options: { from?: string }) => Promise<Error> | Error)} [errorHandler]
 *  A function that takes an error, and either returns or throws a more informative Error
 *  if errorHander is not provided, a default error handler will throw any errors thrown by calling `transaction.call()`
 * @returns {Operation<T>}
 */
function sendTransaction(context, transaction, mapReceipt, errorHandler) {
    var _this = this;
    if (errorHandler === void 0) { errorHandler = function (err, tx, options) {
        if (tx === void 0) { tx = transaction; }
        if (options === void 0) { options = {}; }
        return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, tx.call(options)];
                    case 1:
                        _a.sent();
                        throw err;
                }
            });
        });
    }; }
    var observable = rxjs_1.Observable.create(function (observer) { return __awaiter(_this, void 0, void 0, function () {
        var transactionHash, result, tx, err_1, from, gasEstimate, error_1, err_2, gas, options, confirmationCount;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(typeof transaction === 'function')) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, transaction()];
                case 2:
                    tx = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    observer.error(err_1);
                    return [3 /*break*/, 4];
                case 4: return [3 /*break*/, 6];
                case 5:
                    tx = transaction;
                    _a.label = 6;
                case 6: return [4 /*yield*/, context.getAccount().pipe(operators_1.first()).toPromise()];
                case 7:
                    from = _a.sent();
                    gasEstimate = 0;
                    _a.label = 8;
                case 8:
                    _a.trys.push([8, 10, , 15]);
                    return [4 /*yield*/, tx.estimateGas({ from: from })];
                case 9:
                    gasEstimate = _a.sent();
                    return [3 /*break*/, 15];
                case 10:
                    error_1 = _a.sent();
                    _a.label = 11;
                case 11:
                    _a.trys.push([11, 13, , 14]);
                    return [4 /*yield*/, errorHandler(error_1, transaction, { from: from })];
                case 12:
                    error_1 = _a.sent();
                    return [3 /*break*/, 14];
                case 13:
                    err_2 = _a.sent();
                    error_1 = err_2;
                    return [3 /*break*/, 14];
                case 14:
                    observer.error(error_1);
                    return [2 /*return*/];
                case 15:
                    if (gasEstimate) {
                        gas = gasEstimate * 2;
                    }
                    else {
                        gas = 1000000;
                    }
                    gas = Math.min(1000000, gas);
                    options = {
                        from: from,
                        gas: gas
                    };
                    observer.next({
                        state: ITransactionState.Sending
                    });
                    confirmationCount = 0;
                    tx.send(options)
                        .once('transactionHash', function (hash) {
                        logger_1.Logger.debug('Sending transaction..');
                        transactionHash = hash;
                        observer.next({
                            state: ITransactionState.Sent,
                            transactionHash: transactionHash
                        });
                    })
                        .once('receipt', function (receipt) { return __awaiter(_this, void 0, void 0, function () {
                        var error_2, err_3;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 7]);
                                    return [4 /*yield*/, mapReceipt(receipt)];
                                case 1:
                                    result = _a.sent();
                                    return [3 /*break*/, 7];
                                case 2:
                                    error_2 = _a.sent();
                                    _a.label = 3;
                                case 3:
                                    _a.trys.push([3, 5, , 6]);
                                    return [4 /*yield*/, errorHandler(error_2)];
                                case 4:
                                    error_2 = _a.sent();
                                    return [3 /*break*/, 6];
                                case 5:
                                    err_3 = _a.sent();
                                    error_2 = err_3;
                                    return [3 /*break*/, 6];
                                case 6:
                                    observer.error(error_2);
                                    return [3 /*break*/, 7];
                                case 7:
                                    if (confirmationCount === 0) {
                                        logger_1.Logger.debug("transaction mined!");
                                    }
                                    observer.next({
                                        confirmations: confirmationCount++,
                                        receipt: receipt,
                                        result: result,
                                        state: ITransactionState.Mined,
                                        transactionHash: transactionHash
                                    });
                                    return [2 /*return*/];
                            }
                        });
                    }); })
                        .on('confirmation', function (confNumber, receipt) { return __awaiter(_this, void 0, void 0, function () {
                        var error_3, err_4;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!!result) return [3 /*break*/, 8];
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, , 8]);
                                    return [4 /*yield*/, mapReceipt(receipt)];
                                case 2:
                                    result = _a.sent();
                                    return [3 /*break*/, 8];
                                case 3:
                                    error_3 = _a.sent();
                                    _a.label = 4;
                                case 4:
                                    _a.trys.push([4, 6, , 7]);
                                    return [4 /*yield*/, errorHandler(error_3)];
                                case 5:
                                    error_3 = _a.sent();
                                    return [3 /*break*/, 7];
                                case 6:
                                    err_4 = _a.sent();
                                    error_3 = err_4;
                                    return [3 /*break*/, 7];
                                case 7:
                                    observer.error(error_3);
                                    return [3 /*break*/, 8];
                                case 8:
                                    if (confirmationCount === 0) {
                                        logger_1.Logger.debug("transaction mined!");
                                    }
                                    observer.next({
                                        confirmations: confirmationCount++,
                                        receipt: receipt,
                                        result: result,
                                        state: ITransactionState.Mined,
                                        transactionHash: transactionHash
                                    });
                                    if (confirmationCount > 23) {
                                        // the web3 observer will confirm up to 24 subscriptions, so we are done here
                                        observer.complete();
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); })
                        .on('error', function (error) { return __awaiter(_this, void 0, void 0, function () {
                        var err_5;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, errorHandler(error)];
                                case 1:
                                    error = _a.sent();
                                    return [3 /*break*/, 3];
                                case 2:
                                    err_5 = _a.sent();
                                    error = err_5;
                                    return [3 /*break*/, 3];
                                case 3:
                                    observer.error(error);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
            }
        });
    }); });
    return toIOperationObservable(observable);
}
exports.sendTransaction = sendTransaction;
function toIOperationObservable(observable) {
    // the 3rd update we get from the observable is the confirmation that it is mined
    // @ts-ignore
    observable.send = function () { return observable.pipe(operators_1.take(3)).toPromise(); };
    // @ts-ignore
    return observable;
}
exports.toIOperationObservable = toIOperationObservable;
//# sourceMappingURL=operation.js.map