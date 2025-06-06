// src/utils/mongoClient.ts
import { MongoClient } from "mongodb";

const uri = import.meta.env.VITE_MONGODB_URI || import.meta.env.MONGODB_URI;

if (!uri) {
  throw new Error("MongoDB URI not found in environment variables");
}

const client = new MongoClient(uri);
export default client;
