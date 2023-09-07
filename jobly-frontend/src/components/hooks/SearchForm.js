import React, { useState } from 'react';
import { Row, Col } from 'reactstrap';
import { debounce } from 'lodash';
import './Searchform.css'; // Import the CSS

function SearchForm({ searchFor }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = debounce((term) => {
    searchFor(term);
  }, 300);

  return (
    <Row className="justify-content-center my-4">
      <Col md="8">
        <form className="search-form">
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchTerm}
            onChange={e => {
              setSearchTerm(e.target.value);
              handleSearch(e.target.value);
            }}
            className="form-control search-input"
          />
        </form>
      </Col>
    </Row>
  );
}

export default SearchForm;
