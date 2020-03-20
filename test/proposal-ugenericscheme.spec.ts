import { first } from 'rxjs/operators'
import { DAO } from '../src//dao'
import { Arc } from '../src/arc'
import {
  IProposalStage,
  IProposalState,
  Proposal
  } from '../src/proposal'
import { IGenericScheme} from '../src/schemes/genericScheme'
import { createAProposal, getTestAddresses, getTestDAO, ITestAddresses, LATEST_ARC_VERSION,
  newArc, voteToPassProposal, waitUntilTrue } from './utils'
import { Contract, ethers } from 'ethers'

jest.setTimeout(60000)

/**
 * Proposal test
 */
describe('Proposal', () => {
  let arc: Arc
  let testAddresses: ITestAddresses
  let dao: DAO

  beforeAll(async () => {
    arc = await newArc()
  })

  it.skip('the calldata argument must be provided', async () => {
    await expect(createAProposal(dao, {
      scheme: testAddresses.base.GenericScheme
    })).rejects.toThrow(/missing argument "callData"/i)
  })

  it('proposal flow works for rc.32', async () => {
    const version = '0.0.1-rc.32'
    testAddresses = getTestAddresses(arc)
    // dao = await getTestDAO()
    const ugenericSchemes = await arc.schemes({where: {name: "UGenericScheme", version}}).pipe(first()).toPromise()
    const ugenericScheme = ugenericSchemes[0]
    const ugenericSchemeState = await ugenericScheme.state().pipe(first()).toPromise()
    dao  = new DAO(arc, ugenericSchemeState.dao)
    const states: IProposalState[] = []
    const lastState = (): IProposalState => states[states.length - 1]

    const actionMockABI = arc.getABI(undefined, 'ActionMock', version)

    if(!arc.web3) throw new Error('Web3 provider not set')

    const actionMock = new Contract( testAddresses.test.ActionMock.toString(), actionMockABI, arc.web3.getSigner())
    const callData = new ethers.utils.Interface(actionMockABI).functions.test2.encode([dao.id])

    const proposal = await createAProposal(dao, {
      callData,
      // scheme: testAddresses.base.UGenericScheme,
      scheme: ugenericSchemeState.address,
      schemeToRegister: actionMock.address,
      value: 0
    })
    expect(proposal).toBeInstanceOf(Proposal)

    proposal.state().subscribe((pState: IProposalState) => {
      states.push(pState)
    })

    await waitUntilTrue(() => states.length > 0)

    expect(lastState().genericScheme).toMatchObject({
      callData,
      executed: false,
      returnValue: null
    })

    // accept the proposal by voting the hell out of it
    await voteToPassProposal(proposal)

    await waitUntilTrue(() => (lastState().genericScheme as IGenericScheme).executed)

    expect(lastState()).toMatchObject({
      stage: IProposalStage.Executed
    })
    expect(lastState().genericScheme).toMatchObject({
      callData,
      executed: true,
      returnValue: '0x0000000000000000000000000000000000000000000000000000000000000001'
    })
  })

  it('proposal flow works for 0.0.1-rc.19', async () => {
    const version = '0.0.1-rc.19'
    testAddresses = getTestAddresses(arc, version)
    dao = await getTestDAO(arc, version)
    const states: IProposalState[] = []
    const lastState = (): IProposalState => states[states.length - 1]

    const actionMockABI = arc.getABI(undefined, 'ActionMock', LATEST_ARC_VERSION)
    
    if(!arc.web3) throw new Error('Web3 provider not set')

    const actionMock = new Contract(testAddresses.test.ActionMock.toString(), actionMockABI, arc.web3.getSigner())
    const callData = new ethers.utils.Interface(actionMockABI).functions.test2.encode([dao.id])

    const proposal = await createAProposal(dao, {
      callData,
      scheme: testAddresses.base.GenericScheme, // the contract _was_ called GenericScheme
      schemeToRegister: actionMock.address,
      value: 0
    })
    expect(proposal).toBeInstanceOf(Proposal)

    proposal.state().subscribe((pState: IProposalState) => {
      states.push(pState)
    })

    await waitUntilTrue(() => states.length > 0)

    expect(lastState().genericScheme).toMatchObject({
      callData,
      executed: false,
      returnValue: null
    })

    // accept the proposal by voting the hell out of it
    await voteToPassProposal(proposal)

    await waitUntilTrue(() => (lastState().genericScheme as IGenericScheme).executed)
    expect(lastState()).toMatchObject({
      stage: IProposalStage.Executed
    })
    expect(lastState().genericScheme).toMatchObject({
      callData,
      executed: true,
      returnValue: '0x0000000000000000000000000000000000000000000000000000000000000001'
    })
  })
})
