import assert from "assert";
import * as api from "noop-api";
import * as shared from "shared";

export const noop: api.server.NoopOperationHandler<{}> = async () => {
  const pgPool = shared.usePgPool();

  const result = await pgPool.query("SELECT 1 AS one;");
  assert.deepEqual(result.rows, [{ one: 1 }]);
};
