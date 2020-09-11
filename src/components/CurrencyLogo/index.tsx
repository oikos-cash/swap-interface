import { Currency, TRON, Token } from '@oikos/swap-sdk'
import React, { useMemo } from 'react'
import styled from 'styled-components'

// @TRON
// import EthereumLogo from '../../assets/images/troneum-logo.png'
import TronLogo from '../../assets/images/tron-logo.svg'
import useHttpLocations from '../../hooks/useHttpLocations'
import { WrappedTokenInfo } from '../../state/lists/hooks'
import Logo from '../Logo'
import { ethAddress } from '@opentron/tron-eth-conversions'

const getTokenLogoURL = (address: string) => {
  // TODO(tron): test this works
  const tronAddress = ethAddress.toTron(address)
  return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/tron/assets/${tronAddress}/logo.png`
}

const StyledEthereumLogo = styled.img<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  border-radius: 24px;
`

const StyledLogo = styled(Logo)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
`

export default function CurrencyLogo({
  currency,
  size = '24px',
  style
}: {
  currency?: Currency
  size?: string
  style?: React.CSSProperties
}) {
  const uriLocations = useHttpLocations(currency instanceof WrappedTokenInfo ? currency.logoURI : undefined)

  const srcs: string[] = useMemo(() => {
    if (currency === TRON) return []

    if (currency instanceof Token) {
      if (currency instanceof WrappedTokenInfo) {
        return [...uriLocations, getTokenLogoURL(currency.address)]
      }

      return [getTokenLogoURL(currency.address)]
    }
    return []
  }, [currency, uriLocations])

  if (currency === TRON) {
    return <StyledEthereumLogo src={TronLogo} size={size} style={style} />
  }

  return <StyledLogo size={size} srcs={srcs} alt={`${currency?.symbol ?? 'token'} logo`} style={style} />
}
