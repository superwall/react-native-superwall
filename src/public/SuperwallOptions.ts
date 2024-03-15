import { LogLevel } from './LogLevel';
import { LogScope } from './LogScope';
import { PaywallOptions } from './PaywallOptions';

export enum NetworkEnvironment {
  Release = 'release',
  ReleaseCandidate = 'releaseCandidate',
  Developer = 'developer',
}

export class LoggingOptions {
  level: LogLevel = LogLevel.Info;
  scopes: LogScope[] = [LogScope.All];

  toJson(): object {
    return {
      level: this.level,
      scopes: this.scopes,
    };
  }
}

export class SuperwallOptions {
  paywalls: PaywallOptions = new PaywallOptions();
  networkEnvironment: NetworkEnvironment = NetworkEnvironment.Release;
  isExternalDataCollectionEnabled: boolean = true;
  localeIdentifier?: string;
  isGameControllerEnabled: boolean = false;
  logging: LoggingOptions = new LoggingOptions();

  // Optionally, add a constructor for customization or methods for manipulation
  constructor(init?: Partial<SuperwallOptions>) {
    if (init) {
      Object.assign(this, init);
    }
  }

  // You can add methods to this class if needed
  toJson(): object {
    // Method to serialize class instance to a plain object, useful when passing to native code
    return {
      paywalls: this.paywalls.toJson(),
      networkEnvironment: this.networkEnvironment,
      isExternalDataCollectionEnabled: this.isExternalDataCollectionEnabled,
      localeIdentifier: this.localeIdentifier,
      isGameControllerEnabled: this.isGameControllerEnabled,
      logging: this.logging.toJson(),
    };
  }
}
