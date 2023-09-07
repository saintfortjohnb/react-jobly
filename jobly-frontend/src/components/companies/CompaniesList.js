import React, { useState, useEffect } from 'react';
import JoblyApi from '../api/api';
import CompanyCard from './CompanyCard';
import SearchForm from '../hooks/SearchForm';
import LoadingSpinner from '../hooks/LoadingSpinner'; // Import the spinner

function CompaniesList() {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);  // Initialize loading state

  useEffect(() => {
    const getAllCompanies = async () => {
      const data = await JoblyApi.getCompanies();
      setCompanies(data);
      setIsLoading(false);  // Set loading to false once data is fetched
    }
    getAllCompanies();
  }, []);

  const search = async searchTerm => {
    setIsLoading(true);  // Set loading to true when a search starts
    const data = searchTerm 
      ? await JoblyApi.getCompanies(searchTerm)
      : await JoblyApi.getCompanies();
    setCompanies(data);
    setIsLoading(false);  // Set loading to false once search results are fetched
  }

  if (isLoading) return <LoadingSpinner />;  // Return spinner while loading

  return (
    <div>
      <SearchForm searchFor={search} />
      {companies.map(company => (
        <CompanyCard key={company.handle} company={company} />
      ))}
    </div>
  );
}

export default CompaniesList;
