# Swap Interface

[![Styled With Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://prettier.io/)

An open source interface for Swap -- a protocol for decentralized exchange of Tron tokens.

- Website: [swap2.oikos.cash](https://swap2.oikos.cash/)

## Listing a token

Please see the
[oikos-cash/default-token-list](https://github.com/oikos-cash/default-token-list)
repository.

## Development

### Install Dependencies

```bash
npm install
```

### Run

```bash
npm start
```

### Configuring the environment (optional)

To have the interface default to a different network when a wallet is not connected:

1. Make a copy of `.env` named `.env.local`
2. Change `REACT_APP_NETWORK_ID` to `"{YOUR_NETWORK_ID}"` (e.g. `11111` for Tron Mainnet network)

Example `.env.local` file for Nile network:

```sh
REACT_APP_CHAIN_ID="201910292"
REACT_APP_TRON_NETWORK="nile"
```

Note that the interface only works on testnets where both
[Swap V2](https://github.com/oikos-cash/swap-v2-core/) and
[multicall](https://github.com/opentron/multicall) are deployed.
The interface will not work on other networks.

## Contributions

**Please open all pull requests against the `master` branch.**
CI checks will run against all PRs.

## Accessing Swap Interface V1

The Swap Interface supports swapping against, and migrating or removing liquidity from Swap V1. However,
if you would like to use Swap V1, the Swap V1 interface for mainnet and testnets is accessible via [swap-v1.oikos.cash](https://swap-v1.oikos.cash).
