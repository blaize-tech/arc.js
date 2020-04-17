import { first } from 'rxjs/operators'
import { Arc, ReputationFromTokenScheme } from '../src'
import { newArc } from './utils'

jest.setTimeout(60000)
/**
 * Scheme test
 */
describe('Scheme', () => {

  let arc: Arc
  beforeAll(async () => {
    arc = await newArc()
  })

  it('Redeem Works', async () => {
    const plugins = await arc.plugins({ where: {name: "ReputationFromToken"}})
      .pipe(first()).toPromise()
    const plugin = plugins[0]
    expect(plugin.ReputationFromToken).not.toBeFalsy()
    const reputationFromToken = plugin.ReputationFromToken as ReputationFromTokenScheme

    if(!arc.web3) throw new Error("Web3 provider not set")
    const defaultAccount = arc.defaultAccount? arc.defaultAccount: await arc.web3.getSigner().getAddress()

    const redemptionPromise = reputationFromToken.redeem(defaultAccount).send()
    expect(redemptionPromise).rejects.toThrow()
  })
})
