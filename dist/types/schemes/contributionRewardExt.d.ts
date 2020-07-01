import BN = require('bn.js');
import { Arc } from '../arc';
import { IProposalBaseCreateOptions, Proposal } from '../proposal';
import { Address } from '../types';
export interface IContributionRewardExt {
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
    reputationChangeLeft: BN;
    nativeTokenRewardLeft: BN;
    ethRewardLeft: BN;
    externalTokenRewardLeft: BN;
}
export interface IProposalCreateOptionsContributionRewardExt extends IProposalBaseCreateOptions {
    beneficiary: Address;
    nativeTokenReward?: BN;
    reputationReward?: BN;
    ethReward?: BN;
    externalTokenReward?: BN;
    externalTokenAddress?: Address;
    proposer: Address;
}
export declare enum IProposalType {
    ContributionReward = "ContributionRewardExt"
}
/**
 *
 * @param options
 * @param context
 */
export declare function createProposal(options: any, context: Arc): () => Promise<any>;
export declare function createTransactionMap(options: any, context: Arc): (receipt: any) => Proposal;
