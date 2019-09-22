import {IConfig} from "./conf/iconfig";
import {extend} from 'lodash';
import {Locales} from "./features/locales";
import {DefaultConfig} from "./conf/default-iconfig";


export function initLocaliseBiz(conf: IConfig): Locales {
  const config = extend({}, DefaultConfig, conf);
  return new Locales(config);
}
