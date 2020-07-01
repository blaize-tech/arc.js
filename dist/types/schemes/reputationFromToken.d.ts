import { Operation } from '../operation';
import { Address } from '../types';
import { Scheme } from '../scheme';
export declare class ReputationFromTokenScheme {
    scheme: Scheme;
    constructor(scheme: Scheme);
    getAgreementHash(): Promise<string>;
    redeem(beneficiary: Address, agreementHash?: string): Operation<any>;
    redemptionAmount(beneficiary: Address): Promise<number>;
    getContract(): Promise<any>;
}
