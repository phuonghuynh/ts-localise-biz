import { LocaliseApi } from "../api/localise-api";
import { IConfig } from "../conf/iconfig";
import { ILogger } from "../conf/ilog";
export declare class Locales {
    readonly conf: IConfig;
    readonly api: LocaliseApi;
    readonly logger: ILogger;
    constructor(conf: IConfig);
    sync(locale: string, keys: {
        [key: string]: any;
    }): Promise<any>;
    fetchAndMerge(baseLanguageKeys: {
        [key: string]: any;
    }, outDir: string): Promise<void>;
}
