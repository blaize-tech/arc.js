import { Arc } from '../arc';
import { Proposal } from '../proposal';
import { Address } from '../types';
export interface IGenericSchemeInfo {
    id: string;
    contractToCall: Address;
    votingMachine: Address;
}
export interface IGenericScheme {
    id: string;
    contractToCall: Address;
    callData: string;
    executed: boolean;
    returnValue: string;
}
export interface IProposalCreateOptionsGS {
    callData?: string;
    value?: number;
}
export declare enum IProposalType {
    GenericScheme = "GenericScheme"
}
export declare function createTransaction(options: any, context: Arc): () => Promise<any>;
/**
 * map the transaction receipt of the createTransaction call to a nice result
 * @param  options  the options passed to the createProposal call
 * @param  context an Arc instance
 * @return         [description]
 */
export declare function createTransactionMap(options: any, context: Arc): (receipt: any) => Promise<Proposal>;
