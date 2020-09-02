import createTronLinkProvider from '@opentron/tronlink-provider'

import { AbstractConnectorArguments, ConnectorUpdate } from '@web3-react/types'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { abis } from './tronlink-abis'
// import warning from 'tiny-warning'

export class NoEthereumProviderError extends Error {
  public constructor() {
    super()
    this.name = this.constructor.name
    this.message = 'No Ethereum provider was found on window.ethereum.'
  }
}

export class UserRejectedRequestError extends Error {
  public constructor() {
    super()
    this.name = this.constructor.name
    this.message = 'The user rejected the request.'
  }
}

export class InjectedTronConnector extends AbstractConnector {
  public provider: any

  constructor(kwargs: AbstractConnectorArguments) {
    super(kwargs)
    // TODO(tron): should auto-use same network as one selected in tronlink!
    this.provider = createTronLinkProvider({
      network: process.env.REACT_APP_TRON_NETWORK,
      functionSignatures: abis
    })

    /*
    this.handleNetworkChanged = this.handleNetworkChanged.bind(this)
    this.handleChainChanged = this.handleChainChanged.bind(this)
    this.handleAccountsChanged = this.handleAccountsChanged.bind(this)
    this.handleClose = this.handleClose.bind(this)
    */
  }

  async requestProvider(args: any) {
    const res = await this.provider.request(args)
    // console.log({ res })
    // TODO: wrap error with throw new NoEthereumProviderError()?
    return res
  }

  public async activate(): Promise<ConnectorUpdate> {
    const accounts = await this.requestProvider({ method: 'eth_accounts' })
    // console.log({ accounts })
    const account = accounts[0]
    return { provider: this.provider, account }
  }

  public async getProvider(): Promise<any> {
    return this.provider
  }

  public async getChainId(): Promise<number | string> {
    // const chainId = await this.requestProvider({ method: 'eth_chainId' })
    // return chainId
    // TODO: TRON: wait for eth_chainId to be implemented in provider
    const chainId = await this.requestProvider({ method: 'eth_chainId' })
    return chainId
  }

  public async getAccount(): Promise<null | string> {
    const accounts = await this.requestProvider({ method: 'eth_accounts' })
    const account = accounts[0]
    return account
  }

  public deactivate() {
    return true
  }

  public async isAuthorized(): Promise<boolean> {
    // TODO: check if tronlink unlocked?
    return true
  }
}
