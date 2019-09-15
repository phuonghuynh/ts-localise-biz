export interface ILogger {
    info(msg: string): any;
    warn(msg: string): any;
    error(msg: string, e?: Error): any;
}
export declare class ConsoleLogger implements ILogger {
    info(msg: string): void;
    warn(msg: string): void;
    error(msg: string, e?: Error): void;
}
