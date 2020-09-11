import { CurrencyAmount, TRON, JSBI } from '@oikos/swap-sdk'
import { MIN_TRX } from '../constants'

/**
 * Given some token amount, return the max that can be spent of it
 * @param currencyAmount to return max of
 */
export function maxAmountSpend(currencyAmount?: CurrencyAmount): CurrencyAmount | undefined {
  if (!currencyAmount) return undefined
  if (currencyAmount.currency === TRON) {
    if (JSBI.greaterThan(currencyAmount.raw, MIN_TRX)) {
      return CurrencyAmount.tron(JSBI.subtract(currencyAmount.raw, MIN_TRX))
    } else {
      return CurrencyAmount.tron(JSBI.BigInt(0))
    }
  }
  return currencyAmount
}
