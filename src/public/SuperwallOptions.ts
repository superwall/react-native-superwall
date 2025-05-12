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
  collectAdServicesAttribution: boolean = false;
  passIdentifiersToPlayStore: boolean = false;
  storeKitVersion?: "STOREKIT1" | "STOREKIT2";

  constructor(init?: Partial<SuperwallOptions>) {
    if (init) {
      if (init.paywalls) {
        this.paywalls = new PaywallOptions();
        Object.assign(this.paywalls, init.paywalls);
      }
      Object.assign(this, { ...init, paywalls: this.paywalls });
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
      collectAdServicesAttribution: this.collectAdServicesAttribution,
      passIdentifiersToPlayStore: this.passIdentifiersToPlayStore,
      storeKitVersion: this.storeKitVersion,
    };
  }
}
