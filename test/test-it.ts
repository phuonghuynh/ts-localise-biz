import {suite, test, timeout} from 'mocha-typescript';

@suite(timeout(1_000_000))
export class TestIt {

  @test('should fetch and merge localise')
  async testFetchAndMerge() {
    console.log(123);
  }
}
