export interface ILogger {
  info(msg: string);
  warn(msg: string);
  error(msg: string, e?: Error);
}

export class ConsoleLogger implements ILogger {

  info(msg: string) {
    console.log('\x1b[36m%s\x1b[0m', msg);
  }

  warn(msg: string) {
    console.log('\x1b[33m%s\x1b[0m', msg);
  }

  error(msg: string, e?: Error) {
    console.log('\x1b[31m%s\x1b[0m', msg);
    if (e) {
      console.log('\x1b[31m%s\x1b[0m', e);
    }
  }
}

