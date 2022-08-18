// https://node-postgres.com/features/connecting

import { Client } from "pg";
import vars from "../vars";

// pools will use environment variables for connection information
class PostgresConn {
  // private pool: Pool;

  constructor(
    private user: string,
    private password: string | undefined,
    private host: string,
    private port = 5432,
    private database = "test"
  ) {
    // Logger.debug({ user, host, database, password, port });
    // this.pool = new Pool({ user, host, database, password, port });
  }

  // getPool = () => this.pool;
  getClient = () => new Client({ user: this.user, host: this.host, database: this.database, password: this.password, port: this.port });
}

const { username, host, db, password, port } = vars.postgres;
export const pgConn = new PostgresConn(username, password, host, port, db);
