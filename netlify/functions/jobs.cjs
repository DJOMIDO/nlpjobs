const express = require("express");
const serverless = require("serverless-http");
const fs = require("fs");
const path = require("path");

const app = express();
const router = express.Router();

const dataPath = path.join(process.cwd(), "src", "data", "job_data.json");

router.get("/", (req, res) => {
  console.log("🔍 Reading from:", dataPath);
  try {
    const rawData = fs.readFileSync(dataPath, "utf-8");
    const jobs = JSON.parse(rawData).jobs;
    res.json(jobs);
  } catch (error) {
    console.error("❌ Failed to load job data:", error.message);
    res.status(500).json({ error: "Failed to load job data." });
  }
});

router.get("/:id", (req, res) => {
  const jobId = req.params.id;
  try {
    const rawData = fs.readFileSync(dataPath, "utf-8");
    const jobs = JSON.parse(rawData).jobs;
    const job = jobs.find((j) => j.id === jobId);

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.json(job);
  } catch (error) {
    console.error("❌ Error fetching job by ID:", error);
    res.status(500).json({ error: "Failed to fetch job" });
  }
});

app.use("/.netlify/functions/jobs", router);

module.exports.handler = serverless(app);
