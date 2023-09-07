import React from 'react';
import { Card, CardBody, CardTitle, CardText, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import './Companycard.css';

const CompanyCard = ({ company }) => {
  return (
    <Row className="justify-content-center mb-3">
      <Col md="9" sm="6">
        <Card className="CompanyCard shadow">
          <CardBody>
            <Row>
              <Col md="8" sm="12">
                <CardTitle tag="h5">
                  <Link to={`/companies/${company.handle}`} className="company-link">{company.name}</Link>
                </CardTitle>
                <CardText>{company.description}</CardText>
              </Col>
              <Col md="4" sm="12" className="text-center">
                {company.logoUrl && 
                  <img src={company.logoUrl} alt={company.name} className="company-logo" />
                }
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default CompanyCard;
