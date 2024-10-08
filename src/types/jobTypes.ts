// src/types/jobTypes.ts

export interface Job {
  id: string;
  jobType: string;
  title: string;
  description: string;
  salaryRange: {
    min: number;
    max: number;
    unit: string;
  };
  location: {
    city: string;
    state?: string;
    country: string;
  };
  urgent: boolean;
  company?: string;
  postingDate?: string;
  experienceRequired?: string;
  skillsRequired?: string[];
  contact?: {
    email?: string;
    phone?: string;
  };
  applicationLink?: string;
}
