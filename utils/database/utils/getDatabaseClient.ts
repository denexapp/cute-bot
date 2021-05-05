import { Client } from "faunadb";
import variables from "../../variables";

let client: null | Client = null;

const getDatabaseClient = (): Client => {
  if (client === null) {
    client = new Client({
      secret: variables.databaseSecret,
    });
  }
  return client;
};

export default getDatabaseClient;
