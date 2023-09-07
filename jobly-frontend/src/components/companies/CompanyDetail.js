import React, { useState, useEffect } from 'react';
import JoblyApi from '../api/api';
import JobCardList from '../jobs/JobCardList';
import LoadingSpinner from '../hooks/LoadingSpinner';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardBody, CardText, Container, Row, Col } from 'reactstrap';

function CompanyDetail({ applications, applyToJob }) {
  const { handle } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanyDetail = async () => {
      try {
        const data = await JoblyApi.getCompany(handle);
        if (data) {
          setCompany(data);
          setError(null);
        } else {
          setError('Company not found');
          setTimeout(() => navigate('/companies', { replace: true }), 1000);
        }
      } catch (err) {
        setError('Company not found');
        setTimeout(() => navigate('/companies', { replace: true }), 1000);
      }
    };
    fetchCompanyDetail();
  }, [handle, navigate]);

  if (error) return <div>{error}</div>;

  if (!company) return <LoadingSpinner />;

  return (
    <Container className="company-detail mt-5">
      <Row>
        <Col md={8} className="mx-auto">
          <Card>
            <CardHeader tag="h3">{company.name}</CardHeader>
            <CardBody>
              <CardText>{company.description}</CardText>
            </CardBody>
          </Card>
          <JobCardList jobs={company.jobs} applications={applications} applyToJob={applyToJob} />
        </Col>
      </Row>
    </Container>
  );
}

export default CompanyDetail;
