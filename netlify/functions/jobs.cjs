const { MongoClient } = require("mongodb");
const express = require("express");
const serverless = require("serverless-http");

const app = express();
const router = express.Router();

const uri = process.env.MONGODB_URI;
const dbName = "nlpjobs";
const collectionName = "jobs";

router.get("/", async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const jobsCollection = db.collection(collectionName);
    const jobs = await jobsCollection.find().toArray();
    res.json(jobs);
  } finally {
    await client.close();
  }
});

router.get("/:id", async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const jobsCollection = db.collection(collectionName);
    const job = await jobsCollection.findOne({ id: req.params.id });
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.json(job);
  } catch (error) {
    console.error("❌ Error fetching job by ID:", error.message);
    res.status(500).json({ error: "Failed to fetch job by ID." });
  } finally {
    await client.close();
  }
});

app.use("/.netlify/functions/jobs", router);

module.exports.handler = serverless(app);
