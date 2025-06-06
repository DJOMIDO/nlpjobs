/* netlify/functions/jobs.cjs */

const { MongoClient } = require("mongodb");
const express = require("express");
const serverless = require("serverless-http");

const app = express();
const router = express.Router();

const uri = process.env.MONGODB_URI;
const dbName = "nlpjobs";
const collectionName = "jobs";

let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) return cachedDb;

  if (!cachedClient) {
    cachedClient = new MongoClient(uri, {
      serverApi: { version: "1", strict: true, deprecationErrors: true },
    });
    await cachedClient.connect();
  }

  cachedDb = cachedClient.db(dbName);
  return cachedDb;
}

router.get("/", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const jobs = await db.collection(collectionName).find().toArray();
    res.json(jobs);
  } catch (error) {
    console.error("❌ Failed to fetch jobs:", error.message);
    res.status(500).json({ error: "Failed to fetch jobs from MongoDB" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const job = await db
      .collection(collectionName)
      .findOne({ id: req.params.id });

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.json(job);
  } catch (error) {
    console.error("❌ Error fetching job by ID:", error.message);
    res.status(500).json({ error: "Failed to fetch job by ID." });
  }
});

app.use("/.netlify/functions/jobs", router);
module.exports.handler = serverless(app);
