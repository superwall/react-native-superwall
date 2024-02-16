// Define the LogLevel enum
export enum LogLevel {
  Debug = 'debug',
  Info = 'info',
  Warn = 'warn',
  Error = 'error',
  None = 'none',
}

// Use a namespace with the same name as the enum to extend its functionality
export namespace LogLevel {
  export function fromJson(json: string): LogLevel {
    switch (json) {
      case 'debug':
        return LogLevel.Debug;
      case 'info':
        return LogLevel.Info;
      case 'warn':
        return LogLevel.Warn;
      case 'error':
        return LogLevel.Error;
      case 'none':
        return LogLevel.None;
      default:
        throw new Error(`Invalid LogLevel: ${json}`);
    }
  }
}
