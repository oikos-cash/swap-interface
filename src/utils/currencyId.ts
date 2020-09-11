import { Currency, TRON, Token } from '@oikos/swap-sdk'

export function currencyId(currency: Currency): string {
  if (currency === TRON) return 'TRX'
  if (currency instanceof Token) return currency.address
  throw new Error('invalid currency')
}
