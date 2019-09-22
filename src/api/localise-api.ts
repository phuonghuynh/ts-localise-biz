import {extend, isNull, isUndefined, reduce} from 'lodash';
import Axios from "axios";


//https://localise.biz/api#!/locales/getLocales
export class LocaliseApi {

  //https://localise.biz:443/api/export/all.json?no-folding=true&key=TgjKd5HFNnofS-IWWnOF3132d69ooZhB
  static readonly ROOT_URL = 'https://localise.biz/api';
  static readonly EXPORT_ALL_JSON_URL = `${LocaliseApi.ROOT_URL}/export/all.json`;
  static readonly IMPORT_JSON_URL = `${LocaliseApi.ROOT_URL}/import/json`;
  static readonly LOCALES_URL = `${LocaliseApi.ROOT_URL}/locales`;

  constructor(readonly apiKey: string) {
  }

  // import translated keys into localise project
  // add tag "new" to new keys
  //   - ignore-new=false
  //   - ignore-existing=true
  //   - delete-absent=true
  async sync(locale: string, keys: { [key: string]: any }) {
    const data = JSON.stringify(keys);
    const options = {
      'ignore-new': false,
      'ignore-existing': true,
      'delete-absent': true,
      'locale': locale,
      'tag-new': 'new',
    };

    const queryString = this.toQueryString(options);
    const response = await Axios.post(`${LocaliseApi.IMPORT_JSON_URL}?${queryString}`, data);
    return response.data;
  }

  //return ex: {"en-US": {"hello": "world"}, "ko-KR": {"hello": "world"}}
  async getExportAllJson(): Promise<{ code: { [key: string]: any } }> {
    const exportOptions = {
      'no-folding': true,
      'no-comments': true,
    };

    const queryString = this.toQueryString(exportOptions);
    const response = await Axios.get(`${LocaliseApi.EXPORT_ALL_JSON_URL}?${queryString}`);
    return response.data;
  }

  //https://localise.biz:443/api/locales?key=TgjKd5HFNnofS-IWWnOF3132d69ooZhB
  async getLocales(): Promise<Array<{ code: string, name: string }>> {
    const queryString = this.toQueryString({});
    const response = await Axios.get(`${LocaliseApi.LOCALES_URL}?${queryString}`);
    return response.data;
  }

  private toQueryString(opts: any): string {
    const params = extend({}, opts, {key: this.apiKey});
    return reduce(params, function (result, value, key) {
      return (!isNull(value) && !isUndefined(value)) ? (result += key + '=' + value + '&'):result;
    }, '').slice(0, -1);
  }
}
