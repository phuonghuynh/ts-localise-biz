"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const locales_1 = require("./features/locales");
const default_iconfig_1 = require("./conf/default-iconfig");
function initLocaliseBiz(conf) {
    const config = lodash_1.extend({}, default_iconfig_1.DefaultConfig, conf);
    return new locales_1.Locales(config);
}
exports.initLocaliseBiz = initLocaliseBiz;
//# sourceMappingURL=index.js.map