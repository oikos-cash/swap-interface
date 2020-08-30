import createTronLinkProvider from '@opentron/tronlink-provider'

import { AbstractConnectorArguments, ConnectorUpdate } from '@web3-react/types'
import { AbstractConnector } from '@web3-react/abstract-connector'
// import warning from 'tiny-warning'

type SendReturnResult = { result: any }
type SendReturn = any

type Send = (method: string, params?: any[]) => Promise<SendReturnResult | SendReturn>
// type SendOld = ({ method }: { method: string }) => Promise<SendReturnResult | SendReturn>

interface Ethereum {
  send: Send
  enable: () => Promise<string[]>
  on?: (method: string, listener: (...args: any[]) => void) => void
  removeListener?: (method: string, listener: (...args: any[]) => void) => void
}

declare interface Window {
  ethereum?: Ethereum
}

declare const __DEV__: boolean

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
    this.provider = createTronLinkProvider()

    /*
    this.handleNetworkChanged = this.handleNetworkChanged.bind(this)
    this.handleChainChanged = this.handleChainChanged.bind(this)
    this.handleAccountsChanged = this.handleAccountsChanged.bind(this)
    this.handleClose = this.handleClose.bind(this)
    */
  }

  async sendProvider(...args: any[]) {
    const res = await this.provider.send(...args)
    // TODO: wrap error with throw new NoEthereumProviderError()?
    return res.result
  }

  /*
  private handleChainChanged(chainId: string | number): void {
    if (__DEV__) {
      console.log("Handling 'chainChanged' event with payload", chainId)
    }
    this.emitUpdate({ chainId, provider: window.ethereum })
  }

  private handleAccountsChanged(accounts: string[]): void {
    if (__DEV__) {
      console.log("Handling 'accountsChanged' event with payload", accounts)
    }
    if (accounts.length === 0) {
      this.emitDeactivate()
    } else {
      this.emitUpdate({ account: accounts[0] })
    }
  }

  private handleClose(code: number, reason: string): void {
    if (__DEV__) {
      console.log("Handling 'close' event with payload", code, reason)
    }
    this.emitDeactivate()
  }

  private handleNetworkChanged(networkId: string | number): void {
    if (__DEV__) {
      console.log("Handling 'networkChanged' event with payload", networkId)
    }
    this.emitUpdate({ chainId: networkId, provider: window.ethereum })
  }
  */

  public async activate(): Promise<ConnectorUpdate> {
    const accounts = await this.sendProvider('eth_requestAccounts')
    const account = accounts[0]
    return { provider: this.provider, account }
  }

  /*
  public async activate(): Promise<ConnectorUpdate> {
    if (!window.ethereum) {
      throw new NoEthereumProviderError()
    }

    if (window.ethereum.on) {
      window.ethereum.on('chainChanged', this.handleChainChanged)
      window.ethereum.on('accountsChanged', this.handleAccountsChanged)
      window.ethereum.on('close', this.handleClose)
      window.ethereum.on('networkChanged', this.handleNetworkChanged)
    }

    if ((window.ethereum as any).isMetaMask) {
      ;(window.ethereum as any).autoRefreshOnNetworkChange = false
    }

    // try to activate + get account via eth_requestAccounts
    let account
    try {
      account = await ((window.ethereum as any).send as Send)('eth_requestAccounts').then(
        sendReturn => parseSendReturn(sendReturn)[0]
      )
    } catch (error) {
      if ((error as any).code === 4001) {
        throw new UserRejectedRequestError()
      }
      warning(false, 'eth_requestAccounts was unsuccessful, falling back to enable')
    }

    // if unsuccessful, try enable
    if (!account) {
      // if enable is successful but doesn't return accounts, fall back to getAccount (not happy i have to do this...)
      account = await (window.ethereum as Ethereum)
        .enable()
        .then(sendReturn => sendReturn && parseSendReturn(sendReturn)[0])
    }

    return { provider: window.ethereum, ...(account ? { account } : {}) }
  }
  */

  public async getProvider(): Promise<any> {
    return this.provider
  }

  public async getChainId(): Promise<number | string> {
    const chainId = await this.sendProvider('eth_chainId')
    return chainId
  }

  public async getAccount(): Promise<null | string> {
    const accounts = await this.sendProvider('eth_requestAccounts')
    const account = accounts[0]
    return account
  }

  public deactivate() {
    return true
  }

  /*
  public deactivate() {
    if (window.ethereum && window.ethereum.removeListener) {
      window.ethereum.removeListener('chainChanged', this.handleChainChanged)
      window.ethereum.removeListener('accountsChanged', this.handleAccountsChanged)
      window.ethereum.removeListener('close', this.handleClose)
      window.ethereum.removeListener('networkChanged', this.handleNetworkChanged)
    }
  }
   */

  public async isAuthorized(): Promise<boolean> {
    // TODO: check if tronlink unlocked?
    return true
  }

  /*
  public async isAuthorized(): Promise<boolean> {
    if (!window.ethereum) {
      return false
    }

    try {
      return await ((window.ethereum as Ethereum).send as Send)('eth_accounts').then(sendReturn => {
        if (parseSendReturn(sendReturn).length > 0) {
          return true
        } else {
          return false
        }
      })
    } catch {
      return false
    }
  }
 */
}
