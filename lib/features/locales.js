"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const localise_api_1 = require("../api/localise-api");
const path_1 = require("path");
const fs_extra_1 = require("fs-extra");
const flat_1 = require("flat");
const lodash_1 = require("lodash");
class Locales {
    constructor(conf) {
        this.conf = conf;
        this.api = new localise_api_1.LocaliseApi(this.conf.localiseApiKey);
        this.logger = conf.logger;
    }
    fetchAndMerge(baseLanguageKeys, outDir) {
        return __awaiter(this, void 0, void 0, function* () {
            fs_extra_1.ensureDirSync(outDir);
            const defaultLangJson = flat_1.flatten(baseLanguageKeys);
            const contents = yield this.api.getExportAllJson();
            for (const locale in contents) {
                const localeCode = locale;
                const translated = contents[locale];
                const result = {};
                for (const trans in defaultLangJson) {
                    result[trans] = lodash_1.get(translated, trans, defaultLangJson[trans]);
                }
                const outputFilePath = path_1.resolve(outDir, `${localeCode}.json`);
                fs_extra_1.writeJSONSync(outputFilePath, result);
                this.logger.warn(`Pulled localise ${outputFilePath}`);
            }
            const avaiLocaleCodes = Object.keys(contents);
            const locales = (yield this.api.getLocales())
                .filter(l => avaiLocaleCodes.includes(l.code))
                .map(l => {
                return { code: l.code, name: l.name };
            });
            fs_extra_1.writeJSONSync(`${outDir}/locales.json`, locales);
            this.logger.info(`Languages has been merged in ${outDir}`);
        });
    }
}
exports.Locales = Locales;
//# sourceMappingURL=locales.js.map