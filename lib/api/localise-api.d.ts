export declare class LocaliseApi {
    readonly apiKey: string;
    static readonly ROOT_URL = "https://localise.biz/api";
    static readonly EXPORT_ALL_JSON_URL: string;
    static readonly LOCALES_URL: string;
    constructor(apiKey: string);
    getExportAllJson(): Promise<{
        code: {
            [key: string]: string;
        };
    }>;
    getLocales(): Promise<Array<{
        code: string;
        name: string;
    }>>;
    private toQueryString;
}
