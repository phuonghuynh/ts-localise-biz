"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConsoleLogger {
    info(msg) {
        console.log('\x1b[36m%s\x1b[0m', msg);
    }
    warn(msg) {
        console.log('\x1b[33m%s\x1b[0m', msg);
    }
    error(msg, e) {
        console.log('\x1b[31m%s\x1b[0m', msg);
        if (e) {
            console.log('\x1b[31m%s\x1b[0m', e);
        }
    }
}
exports.ConsoleLogger = ConsoleLogger;
//# sourceMappingURL=ilog.js.map