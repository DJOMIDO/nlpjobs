// src/components/JobList.tsx

import React, { useEffect, useState } from "react";
import JobCard from "./JobCard"; // 引入 JobCard 组件
import "./JobList.css"; // 引入样式

// 定义 Job 类型
interface Job {
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
    state: string;
    country: string;
  };
  company: string;
  postingDate: string;
  experienceRequired: string;
  skillsRequired: string[];
  contact: {
    email: string;
    phone: string;
  };
  applicationLink: string;
  urgent: boolean;
}

const JobList: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]); // 显式定义 jobs 为 Job 数组类型
  const [loading, setLoading] = useState(true);

  // 从 json-server 获取所有工作数据
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:3001/jobs"); // 使用统一的 /jobs 端点
        const data = await response.json();
        setJobs(data); // 设置获取到的工作数据
        setLoading(false); // 数据加载完毕
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setLoading(false); // 如果发生错误，仍然结束加载状态
      }
    };

    fetchJobs();
  }, []);

  // 如果数据正在加载，显示加载状态
  if (loading) {
    return <div>Loading...</div>; // 可以用 Spinner 组件替换
  }

  return (
    <div className="job-list">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          onViewDetails={() => window.open(`/job/${job.id}`, "_blank")} // 点击时在新标签页中打开详情
        />
      ))}
    </div>
  );
};

export default JobList;
