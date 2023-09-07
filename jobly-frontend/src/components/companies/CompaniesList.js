// components/CompaniesList.js

import React, { useState, useEffect } from 'react';
import JoblyApi from '../api/api';
import CompanyCard from './CompanyCard';
import SearchForm from '../hooks/SearchForm';

function CompaniesList() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const getAllCompanies = async () => {
      const data = await JoblyApi.getCompanies();
      setCompanies(data);
    }
    getAllCompanies();
  }, []);

  const search = async searchTerm => {
    const data = searchTerm 
      ? await JoblyApi.getCompanies(searchTerm)
      : await JoblyApi.getCompanies();
    setCompanies(data);
  }

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
