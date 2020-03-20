import { Arc } from '../arc'
import { Proposal } from '../proposal'
import { Address } from '../types'

export interface IUGenericSchemeInfo {
  id: string
  contractToCall: Address
  votingMachine: Address
}

export interface IUGenericScheme {
  id: string
  contractToCall: Address
  callData: string
  executed: boolean
  returnValue: string
}

export interface IProposalCreateOptionsGS {
  callData?: string
  value?: number
}
export enum IProposalType {
  GenericScheme = 'UGenericScheme'
}

export function createTransaction(context: Arc, options: any) {
  if (!options.callData) {
    throw new Error(`Missing argument "callData" for UGenericScheme in Proposal.create()`)
  }
  if (options.value === undefined) {
    throw new Error(`Missing argument "value" for UGenericScheme in Proposal.create()`)
  }
  return async () => {
    options.descriptionHash = await context.saveIPFSData(options)

    const genericScheme = context.getContract(options.scheme)
    const transaction = genericScheme.proposeCall(
      options.dao,
      options.callData,
      options.value,
      options.descriptionHash
    )
    return transaction
  }
}

/**
 * map the transaction receipt of the createTransaction call to a nice result
 * @param  context an Arc instance
 * @param  options  the options passed to the createProposal call
 * @return         [description]
 */
export function createTransactionMap(context: Arc, options: any) {
  const eventName = 'NewCallProposal'
  const map = async (receipt: any) => {
    const proposalId = receipt.events.find((event: any) => event.event === eventName).args._proposalId
    return new Proposal(context, proposalId)
  }
  return map
}
