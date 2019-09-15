import { ILogger } from "./ilog";
export interface IConfig {
    localiseApiKey: string;
    logger?: ILogger;
}
