import React, { useState, useEffect } from 'react';
import JoblyApi from '../api/api';
import JobCard from './JobCard';
import SearchForm from '../hooks/SearchForm';
import LoadingSpinner from '../hooks/LoadingSpinner'; // Import the spinner

function JobsList({ applications, applyToJob }) {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);  // Initialize loading state

  useEffect(() => {
    const getAllJobs = async () => {
      const data = await JoblyApi.getJobs();
      const appliedJobs = data.map(job => ({
        ...job,
        applied: applications.includes(job.id) // check if the user has applied to this job
      }));
      setJobs(appliedJobs);
      setIsLoading(false);  // Set loading to false once data is fetched
    }
    getAllJobs();
  }, [applications]); 

  const search = async searchTerm => {
    setIsLoading(true);  // Set loading to true when a search starts
    const data = searchTerm 
      ? await JoblyApi.getJobs(searchTerm)
      : await JoblyApi.getJobs();
    const appliedJobs = data.map(job => ({
      ...job,
      applied: applications.includes(job.id) 
    }));
    setJobs(appliedJobs);
    setIsLoading(false);  // Set loading to false once search results are fetched
  }

  if (isLoading) return <LoadingSpinner />;  // Return spinner while loading

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
