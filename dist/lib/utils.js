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
var WebSocket = require("isomorphic-ws");
var rxjs_1 = require("rxjs");
var Web3 = require('web3');
function fromWei(amount) {
    return Web3.utils.fromWei(amount, 'ether');
}
exports.fromWei = fromWei;
function toWei(amount) {
    return Web3.utils.toWei(amount.toString(), 'ether');
}
exports.toWei = toWei;
function checkWebsocket(options) {
    var ws = new WebSocket(options.url, {
    // origin: 'https://websocket.org'
    });
    ws.onopen = function open() {
        // console.log('connected')
        ws.send(Date.now());
    };
    ws.onclose = function close() {
        // console.log('disconnected')
    };
    ws.onmessage = function incoming(data) {
        // console.log(`Roundtrip time: ${Date.now() - data} ms`)
        setTimeout(function timeout() {
            ws.send(Date.now());
        }, 500);
    };
}
exports.checkWebsocket = checkWebsocket;
function hexStringToUint8Array(hexString) {
    if (hexString.startsWith('0x')) {
        hexString = hexString.substring(2);
    }
    // @ts-ignore
    return new Uint8Array(hexString.match(/.{1,2}/g).map(function (byte) { return parseInt(byte, 16); }));
}
exports.hexStringToUint8Array = hexStringToUint8Array;
// function lifted and adapted from @daostack/subgraph/src/utils to generate unique ids
function concat(a, b) {
    var out = new Uint8Array(a.length + b.length);
    for (var i = 0; i < a.length; i++) {
        out[i] = a[i];
    }
    for (var j = 0; j < b.length; j++) {
        out[a.length + j] = b[j];
    }
    return out;
}
exports.concat = concat;
function eventId(event) {
    var hash = Web3.utils.keccak256(concat(event.transactionHash, event.logIndex));
    return hash;
}
exports.eventId = eventId;
function isAddress(address) {
    if (!address) {
        throw new Error("Not a valid address: " + address);
    }
    if (!Web3.utils.isAddress(address)) {
        throw new Error("Not a valid address: " + address);
    }
}
exports.isAddress = isAddress;
/**
 * convert a ZenObservable to an rxjs.Observable
 * @param  zenObservable [description]
 * @return an Observable instance
 */
function zenToRxjsObservable(zenObservable) {
    return rxjs_1.Observable.create(function (obs) {
        var subscription = zenObservable.subscribe(obs);
        return function () { return subscription.unsubscribe(); };
    });
}
exports.zenToRxjsObservable = zenToRxjsObservable;
/** convert the number representation of RealMath.sol representations to real real numbers
 * @param  t a BN instance of a real number in the RealMath representation
 * @return  a BN
 */
function realMathToNumber(t) {
    var REAL_FBITS = 40;
    var fraction = t.maskn(REAL_FBITS).toNumber() / Math.pow(2, REAL_FBITS);
    return t.shrn(REAL_FBITS).toNumber() + fraction;
}
exports.realMathToNumber = realMathToNumber;
exports.NULL_ADDRESS = '0x0000000000000000000000000000000000000000';
/**
 * creates a string to be plugsging into a graphql query
 * @example
 * `{  proposals ${createGraphQlQuery({ skip: 2}, 'id: "2"')}
 *    { id }
 * }`
 * @param  options [description]
 * @param  where   [description]
 * @return         [description]
 */
function createGraphQlQuery(options, where) {
    if (where === void 0) { where = ''; }
    var queryString = "";
    if (!where) {
        where = createGraphQlWhereQuery(options.where);
    }
    if (where) {
        queryString += "where: {\n      " + where + "\n    }";
    }
    if (options.first) {
        queryString += "first: " + options.first + "\n";
    }
    if (options.skip) {
        queryString += "skip: " + options.skip + "\n";
    }
    if (options.orderBy) {
        queryString += "orderBy: " + options.orderBy + "\n";
    }
    if (options.orderDirection) {
        queryString += "orderDirection: " + options.orderDirection + "\n";
    }
    if (queryString) {
        return "(" + queryString + ")";
    }
    else {
        return '';
    }
}
exports.createGraphQlQuery = createGraphQlQuery;
function createGraphQlWhereQuery(where) {
    var result = '';
    if (!where) {
        where = {};
    }
    for (var _i = 0, _a = Object.keys(where); _i < _a.length; _i++) {
        var key = _a[_i];
        if (where[key] === undefined) {
            continue;
        }
        var value = where[key];
        if (value === null || typeof (value) === 'boolean') {
            result += key + ": " + value + "\n";
        }
        else if (key === 'dao' || key === 'address') {
            isAddress(value);
            value = value.toLowerCase();
            result += key + ": \"" + value + "\"\n";
        }
        else if (key.endsWith('_in') || key.endsWith('_not_in')) {
            value = JSON.stringify(value);
            result += key + ": " + value + "\n";
        }
        else {
            result += key + ": \"" + value + "\"\n";
        }
    }
    return result;
}
exports.createGraphQlWhereQuery = createGraphQlWhereQuery;
function dateToSecondsSinceEpoch(date) {
    if (!(date instanceof Date)) {
        throw Error("Input should be a Date instance, got " + date + " instead");
    }
    return Math.floor(date.getTime() / 1000);
}
exports.dateToSecondsSinceEpoch = dateToSecondsSinceEpoch;
function secondSinceEpochToDate(seconds) {
    try {
        seconds = Number(seconds);
    }
    catch (e) {
        throw e;
        // throw Error(`argument "seconds" must be a number, got ${seconds} instead`)
    }
    var d = new Date();
    d.setTime(seconds * 1000);
    return d;
}
exports.secondSinceEpochToDate = secondSinceEpochToDate;
/**
 * get the latest block time, or the current time, whichver is later
 *
 * @export
 * @param {*} web3
 * @returns
 */
function getBlockTime(web3) {
    return __awaiter(this, void 0, void 0, function () {
        var block, blockTime, now;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, web3.eth.getBlock('latest')];
                case 1:
                    block = _a.sent();
                    blockTime = new Date(block.timestamp * 1000);
                    now = new Date();
                    now.setMilliseconds(0);
                    if (now < blockTime) {
                        return [2 /*return*/, blockTime];
                    }
                    else {
                        return [2 /*return*/, now];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.getBlockTime = getBlockTime;
//# sourceMappingURL=utils.js.map