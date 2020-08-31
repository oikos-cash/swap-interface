import { Interface } from '@ethersproject/abi'
import { ChainId } from '@oikos/swap-sdk'
import V1_EXCHANGE_ABI from './v1_exchange.json'
import V1_FACTORY_ABI from './v1_factory.json'

const V1_FACTORY_ADDRESSES: { [chainId in ChainId]: string } = {
  // TODO: TRON: mainnet factory address
  [ChainId.MAINNET]: '0xtodo',
  [ChainId.NILE]: '0x8df71B972162A84231611592eDFC8cd9A318A9eF'
}

const V1_FACTORY_INTERFACE = new Interface(V1_FACTORY_ABI)
const V1_EXCHANGE_INTERFACE = new Interface(V1_EXCHANGE_ABI)

export { V1_FACTORY_ADDRESSES, V1_FACTORY_INTERFACE, V1_FACTORY_ABI, V1_EXCHANGE_INTERFACE, V1_EXCHANGE_ABI }
