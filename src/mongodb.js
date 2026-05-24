import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || process.env.Atlas_MONGODB_URI;
const dbName = process.env.MONGODB_DB || process.env.Atlas_MONGODB_DB || extractDatabaseName(uri);

if (!uri) {
  throw new Error(
    "Missing required environment variable: MONGODB_URI or Atlas_MONGODB_URI"
  );
}

const options = {
  appName: "AsmatMaman",
  maxIdleTimeMS: 5000,
};

const client = new MongoClient(uri, options);
const clientPromise = global._mongoClientPromise || (global._mongoClientPromise = client.connect());

export async function connectToDatabase() {
  const connectedClient = await clientPromise;
  const db = dbName ? connectedClient.db(dbName) : connectedClient.db();
  return { client: connectedClient, db };
}

export default connectToDatabase;

function extractDatabaseName(uri) {
  if (!uri) return undefined;
  const match = uri.match(/mongodb(?:\+srv)?:\/\/[^/]+\/(?<db>[^?]+)(?:\?|$)/);
  return match?.groups?.db;
}

