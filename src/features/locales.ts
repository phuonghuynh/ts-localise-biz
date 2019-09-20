import {LocaliseApi} from "../api/localise-api";
import {resolve} from "path";
import {ensureDirSync, writeJSONSync} from "fs-extra";
import {flatten} from "flat";
import {get} from 'lodash';
import {IConfig} from "../conf/iconfig";
import {ILogger} from "../conf/ilog";


export class Locales {
  readonly api: LocaliseApi;
  readonly logger: ILogger;

  constructor(readonly conf: IConfig) {
    this.api = new LocaliseApi(this.conf.localiseApiKey);
    this.logger = conf.logger;
  }

  /** import translated keys into localise project
      add tag "new" to new keys
        - ignore-new=false
        - ignore-existing=true
        - delete-absent=true
   */
  async sync(locale: string, keys: { [key: string]: any }) {
    return this.api.sync(locale, keys);
  }

  /*
  Fetch and merge Locales from Localise Project, then write them to "outDir"
  * */
  async fetchAndMerge(baseLanguageKeys: {[key: string]: any}, outDir: string) {
    ensureDirSync(outDir);
    const defaultLangJson = flatten(baseLanguageKeys);

    const contents = await this.api.getExportAllJson();
    for (const locale in contents) {
      const localeCode = locale;
      const translated = contents[locale];

      const result = {};
      for (const trans in defaultLangJson) {
        result[trans] = get(translated, trans) || defaultLangJson[trans]; //translation is empty, so we use default value
      }

      const outputFilePath = resolve(outDir, `${localeCode}.json`);
      writeJSONSync(outputFilePath, result);
      this.logger.warn(`Pulled localise ${outputFilePath}`);
    }

    const avaiLocaleCodes = Object.keys(contents);
    const locales = (await this.api.getLocales())
      .filter(l => avaiLocaleCodes.includes(l.code))
      .map(l => {
        return {code: l.code, name: l.name};
      });
    writeJSONSync(`${outDir}/locales.json`, locales);
    this.logger.info(`Languages has been merged in ${outDir}`);
  }
}
