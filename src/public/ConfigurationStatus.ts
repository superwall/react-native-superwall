export enum ConfigurationStatus {
  CONFIGURED = 'CONFIGURED',
  FAILED = 'FAILED',
  PENDING = 'PENDING',
}

export namespace ConfigurationStatus {
  export function fromString(value: string): ConfigurationStatus {
    switch (value) {
      case 'FAILED':
        return ConfigurationStatus.FAILED;
      case 'PENDING':
        return ConfigurationStatus.PENDING;
      case 'CONFIGURED':
        return ConfigurationStatus.CONFIGURED;
      default:
        return ConfigurationStatus.PENDING;
    }
  }
}
