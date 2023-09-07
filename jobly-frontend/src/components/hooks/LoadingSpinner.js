import React from 'react';
import { Spinner } from 'reactstrap';

const LoadingSpinner = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" color="primary" />
    </div>
  );
}

export default LoadingSpinner;
