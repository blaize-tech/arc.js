import BN = require('bn.js');
export interface IGenesisProtocolParams {
    activationTime: number;
    boostedVotePeriodLimit: number;
    daoBountyConst: number;
    limitExponentValue: number;
    minimumDaoBounty: BN;
    preBoostedVotePeriodLimit: number;
    proposingRepReward: BN;
    queuedVoteRequiredPercentage: number;
    queuedVotePeriodLimit: number;
    quietEndingPeriod: number;
    thresholdConst: number;
    votersReputationLossRatio: number;
}
export declare function mapGenesisProtocolParams(params: IGenesisProtocolParams): {
    activationTime: number;
    boostedVotePeriodLimit: number;
    daoBountyConst: number;
    limitExponentValue: number;
    minimumDaoBounty: BN;
    preBoostedVotePeriodLimit: number;
    proposingRepReward: BN;
    queuedVotePeriodLimit: number;
    queuedVoteRequiredPercentage: number;
    quietEndingPeriod: number;
    thresholdConst: number;
    votersReputationLossRatio: number;
};
