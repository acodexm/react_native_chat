import { logger } from 'react-native-logs';
import { ansiColorConsoleSync } from 'react-native-logs/dist/transports/ansiColorConsoleSync';

const config = {
  severty: 'debug',
  transport: ansiColorConsoleSync,
  transportOptions: {
    hideDate: true,
  },
};
const log = logger.createLogger(config);

class Log {
  static debug(...msg: any[]): void {
    log.debug(Log.createStack(2));
    log.debug(...msg);
  }

  static info(...msg: any[]): void {
    log.info(Log.createStack(1));
    log.info(...msg);
  }

  static warn(...msg: any[]): void {
    log.warn(Log.createStack(3));
    log.warn(...msg);
  }

  static error(...msg: any[]): void {
    log.error(Log.createStack(5));
    log.error(...msg);
  }
  private static createStack(max: number): string {
    const { stack } = new Error();
    const traces = stack?.split('\n').slice(2, max + 2) ?? [''];
    return traces
      .map((value) => value.slice(0, value.indexOf('http')))
      .reduce((previousValue, currentValue) => `${previousValue} >> ${currentValue}`);
  }
}
if (!__DEV__) {
  log.setSeverity('error');
}
export { Log };
