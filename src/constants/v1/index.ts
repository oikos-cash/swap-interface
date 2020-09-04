import { Interface } from '@ethersproject/abi'
import { ChainId } from '@oikos/swap-sdk'
import V1_EXCHANGE_ABI from './v1_exchange.json'
import V1_FACTORY_ABI from './v1_factory.json'

const V1_FACTORY_ADDRESSES: { [chainId in ChainId]: string } = {
  // TODO: TRON: mainnet factory address
  [ChainId.MAINNET]: '0x0bdCBA8Ca6bAfcEc522F20eEF0CcE9BA603F3e43',
  [ChainId.NILE]: '0x64d5aF91C3A4aE5dB503dA8be25b5E47ad2D944e',
  [ChainId.SHASTA]: '0xtodofactoryv1shasta'
}

const V1_FACTORY_INTERFACE = new Interface(V1_FACTORY_ABI)
const V1_EXCHANGE_INTERFACE = new Interface(V1_EXCHANGE_ABI)

export { V1_FACTORY_ADDRESSES, V1_FACTORY_INTERFACE, V1_FACTORY_ABI, V1_EXCHANGE_INTERFACE, V1_EXCHANGE_ABI }
