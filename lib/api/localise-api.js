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
const lodash_1 = require("lodash");
const axios_1 = require("axios");
class LocaliseApi {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }
    sync(locale, keys) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = JSON.stringify(keys);
            const options = {
                'ignore-new': false,
                'ignore-existing': true,
                'delete-absent': true,
                'locale': locale,
                'tag-new': 'new',
            };
            const queryString = this.toQueryString(options);
            const response = yield axios_1.default.post(`${LocaliseApi.IMPORT_JSON_URL}?${queryString}`, data);
            return response.data;
        });
    }
    getExportAllJson() {
        return __awaiter(this, void 0, void 0, function* () {
            const exportOptions = {
                'no-folding': true,
                'no-comments': true,
            };
            const queryString = this.toQueryString(exportOptions);
            const response = yield axios_1.default.get(`${LocaliseApi.EXPORT_ALL_JSON_URL}?${queryString}`);
            return response.data;
        });
    }
    getLocales() {
        return __awaiter(this, void 0, void 0, function* () {
            const queryString = this.toQueryString({});
            const response = yield axios_1.default.get(`${LocaliseApi.LOCALES_URL}?${queryString}`);
            return response.data;
        });
    }
    toQueryString(opts) {
        const params = lodash_1.extend({}, opts, { key: this.apiKey });
        return lodash_1.reduce(params, function (result, value, key) {
            return (!lodash_1.isNull(value) && !lodash_1.isUndefined(value)) ? (result += key + '=' + value + '&') : result;
        }, '').slice(0, -1);
    }
}
exports.LocaliseApi = LocaliseApi;
LocaliseApi.ROOT_URL = 'https://localise.biz/api';
LocaliseApi.EXPORT_ALL_JSON_URL = `${LocaliseApi.ROOT_URL}/export/all.json`;
LocaliseApi.IMPORT_JSON_URL = `${LocaliseApi.ROOT_URL}/import/json`;
LocaliseApi.LOCALES_URL = `${LocaliseApi.ROOT_URL}/locales`;
//# sourceMappingURL=localise-api.js.map