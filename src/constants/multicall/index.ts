import { ChainId } from '@oikos/swap-sdk'
import MULTICALL_ABI from './abi.json'

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  // TODO: TRON: mainnet multicall contract address
  [ChainId.MAINNET]: '0xtodo',
  [ChainId.NILE]: '0x04A6730FC23a5f2C3d94F7C7aCb4F92Eab8282c2'
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }
