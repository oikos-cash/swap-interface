// all abis...
import { V1_EXCHANGE_ABI, V1_FACTORY_ABI } from '../../constants/v1'
import { abi as IUniswapV2PairABI } from '@uniswap/v2-core/build/IUniswapV2Pair.json'
import { abi as IUniswapV2FactoryABI } from '@uniswap/v2-core/build/IUniswapV2Factory.json'
import { abi as IUniswapV2Router02ABI } from '@uniswap/v2-periphery/build/IUniswapV2Router02.json'
import ENS_ABI from '../../constants/abis/ens-registrar.json'
import ENS_PUBLIC_RESOLVER_ABI from '../../constants/abis/ens-public-resolver.json'
import UNISOCKS_ABI from '../../constants/abis/unisocks.json'
import WETH_ABI from '../../constants/abis/weth.json'
import { MIGRATOR_ABI } from '../../constants/abis/migrator'
import ERC20_ABI from '../../constants/abis/erc20.json'
import { MULTICALL_ABI } from '../../constants/multicall'

export const abis = [
  ...ERC20_ABI,
  ...IUniswapV2Router02ABI,
  ...IUniswapV2FactoryABI,
  ...IUniswapV2PairABI,
  ...V1_EXCHANGE_ABI,
  ...V1_FACTORY_ABI,
  ...ENS_ABI,
  ...ENS_PUBLIC_RESOLVER_ABI,
  ...UNISOCKS_ABI,
  ...WETH_ABI,
  ...MIGRATOR_ABI,
  ...MULTICALL_ABI
]
