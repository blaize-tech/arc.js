import BN = require('bn.js');
import { Arc } from '../arc';
import { Proposal } from '../proposal';
import { Address } from '../types';
export interface IContributionReward {
    beneficiary: Address;
    externalTokenReward: BN;
    externalToken: Address;
    ethReward: BN;
    nativeTokenReward: BN;
    periods: number;
    periodLength: number;
    reputationReward: BN;
    alreadyRedeemedNativeTokenPeriods: number;
    alreadyRedeemedReputationPeriods: number;
    alreadyRedeemedExternalTokenPeriods: number;
    alreadyRedeemedEthPeriods: number;
    reputationChangeLeft: BN | null;
    nativeTokenRewardLeft: BN | null;
    ethRewardLeft: BN | null;
    externalTokenRewardLeft: BN | null;
}
export interface IProposalCreateOptionsCR {
    beneficiary: Address;
    nativeTokenReward?: BN;
    reputationReward?: BN;
    ethReward?: BN;
    externalTokenReward?: BN;
    externalTokenAddress?: Address;
    periodLength?: number;
    periods?: any;
}
export declare enum IProposalType {
    ContributionReward = "ContributionReward"
}
export declare function createProposal(options: any, context: Arc): () => Promise<any>;
export declare function createTransactionMap(options: any, context: Arc): (receipt: any) => Proposal;
