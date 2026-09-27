import { Job } from "../types/jobTypes";

const jobsEndpoint = "/.netlify/functions/jobs";

async function request<T>(url: string): Promise<T> {
  const response = await fetch(url);
  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      payload && typeof payload.error === "string"
        ? payload.error
        : `Request failed with status ${response.status}`
    );
  }

  return payload as T;
}

export function fetchJobs(): Promise<Job[]> {
  return request<Job[]>(jobsEndpoint);
}

export function fetchJob(jobId: string): Promise<Job> {
  return request<Job>(`${jobsEndpoint}/${encodeURIComponent(jobId)}`);
}
