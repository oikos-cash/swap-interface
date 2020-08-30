import createJavaTronProvider from '@opentron/java-tron-provider'

import { InjectedTronConnector } from './injected-tron-connector'

export class NetworkTronConnector extends InjectedTronConnector {
  constructor(kwargs: any) {
    super(kwargs)
    this.provider = createJavaTronProvider()
  }
}
