import { Arc } from '../arc';
import { Proposal } from '../proposal';
import { Address } from '../types';
export interface ISchemeRegistrar {
    id: string;
    schemeToRegister: Address;
    schemeToRegisterParamsHash: string;
    schemeToRegisterPermission: string;
    schemeToRemove: string;
    decision: number;
    schemeRegistered: boolean;
    schemeRemoved: boolean;
}
export interface IProposalCreateOptionsSR {
    parametersHash?: string;
    permissions?: string;
    schemeToRegister?: Address;
}
export declare enum IProposalType {
    SchemeRegistrarAdd = "SchemeRegistrarAdd",
    SchemeRegistrarEdit = "SchemeRegistrarEdit",
    SchemeRegistrarRemove = "SchemeRegistrarRemove"
}
export declare function createTransaction(options: any, context: Arc): () => any;
export declare function createTransactionMap(options: any, context: Arc): (receipt: any) => Proposal;
