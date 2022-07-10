import type * as jsonrpc from 'jsonrpc-lite';
import pMap from 'p-map';

export class Fh0Plumber {
  async jsonRpc(requests: jsonrpc.IParsedObject[]): Promise<void> {
    console.log(requests);
    await pMap(
      requests,
      async (r) => {
        console.log(r);
        // throw new Error();
      },
      { concurrency: 1 },
    );
  }
}
