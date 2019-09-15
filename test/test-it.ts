import {suite, test, timeout} from 'mocha-typescript';
import {initLocaliseBiz} from "../src";
import * as chaiAsPromised from 'chai-as-promised';
import * as dotenv from 'dotenv';
import {DefaultI18n} from "./default-i18n";
import * as chai from 'chai';


chai.use(chaiAsPromised);
dotenv.config();

@suite(timeout(1_000_000))
export class TestIt {

  @test('should fetch and merge localise')
  async testFetchAndMerge() {
    initLocaliseBiz({localiseApiKey: process.env.LocaliseApiKey})
      .fetchAndMerge(DefaultI18n, `./test/localise`);
  }
}
