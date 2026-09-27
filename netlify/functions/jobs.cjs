/* netlify/functions/jobs.cjs */

const { MongoClient } = require("mongodb");
const express = require("express");
const serverless = require("serverless-http");
const fs = require("fs");
const path = require("path");

const app = express();
const router = express.Router();

const uri = process.env.MONGODB_URI;
const dbName = "nlpjobs";
const collectionName = "jobs";
const demoJobs = JSON.parse(
  fs.readFileSync(path.join(__dirname, "job_data.json"), "utf8")
);

let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) return cachedDb;

  if (!uri) return null;

  if (!cachedClient) {
    cachedClient = new MongoClient(uri, {
      serverApi: { version: "1", strict: true, deprecationErrors: true },
    });
    await cachedClient.connect();
  }

  cachedDb = cachedClient.db(dbName);
  return cachedDb;
}

async function getJobs() {
  try {
    const db = await connectToDatabase();
    if (!db) return demoJobs;

    return await db.collection(collectionName).find().toArray();
  } catch (error) {
    console.warn("MongoDB unavailable; serving demo jobs:", error.message);
    return demoJobs;
  }
}

router.get("/", async (req, res) => {
  try {
    res.setHeader("Cache-Control", "public, max-age=300, s-maxage=3600");
    res.json(await getJobs());
  } catch (error) {
    console.error("Failed to load jobs:", error.message);
    res.status(500).json({ error: "Failed to load jobs" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const jobs = await getJobs();
    const job = jobs.find((candidate) => candidate.id === req.params.id);

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.json(job);
  } catch (error) {
    console.error("Failed to load job:", error.message);
    res.status(500).json({ error: "Failed to load job" });
  }
});

app.use("/.netlify/functions/jobs", router);
module.exports.handler = serverless(app);
