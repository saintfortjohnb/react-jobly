// components/JobsList.js

import React, { useState, useEffect } from 'react';
import JoblyApi from '../api/api';
import JobCard from './JobCard';
import SearchForm from '../hooks/SearchForm';

function JobsList({ applications, applyToJob }) {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const getAllJobs = async () => {
      const data = await JoblyApi.getJobs();
      const appliedJobs = data.map(job => ({
        ...job,
        applied: applications.includes(job.id) // check if the user has applied to this job
      }));
      setJobs(appliedJobs);
    }
    getAllJobs();
  }, [applications]); 

  const search = async searchTerm => {
    const data = searchTerm 
      ? await JoblyApi.getJobs(searchTerm)
      : await JoblyApi.getJobs();
    const appliedJobs = data.map(job => ({
      ...job,
      applied: applications.includes(job.id) // check if the user has applied to this job
    }));
    setJobs(appliedJobs);
  }

  return (
    <div>
      <SearchForm searchFor={search} />
      {jobs.map(job => (
        <JobCard key={job.id} job={job} applyToJob={applyToJob} />
      ))}
    </div>
  );
}

export default JobsList;
