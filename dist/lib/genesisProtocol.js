"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BN = require("bn.js");
var utils_1 = require("./utils");
function mapGenesisProtocolParams(params) {
    return {
        activationTime: Number(params.activationTime),
        boostedVotePeriodLimit: Number(params.boostedVotePeriodLimit),
        daoBountyConst: Number(params.daoBountyConst),
        limitExponentValue: Number(params.limitExponentValue),
        minimumDaoBounty: new BN(params.minimumDaoBounty),
        preBoostedVotePeriodLimit: Number(params.preBoostedVotePeriodLimit),
        proposingRepReward: new BN(params.proposingRepReward),
        queuedVotePeriodLimit: Number(params.queuedVotePeriodLimit),
        queuedVoteRequiredPercentage: Number(params.queuedVoteRequiredPercentage),
        quietEndingPeriod: Number(params.quietEndingPeriod),
        thresholdConst: utils_1.realMathToNumber(new BN(params.thresholdConst)),
        votersReputationLossRatio: Number(params.votersReputationLossRatio)
    };
}
exports.mapGenesisProtocolParams = mapGenesisProtocolParams;
//# sourceMappingURL=genesisProtocol.js.map