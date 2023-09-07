import React from 'react';
import { Card, CardBody, CardTitle, CardText, Col, Row, Badge, Button } from 'reactstrap';

function JobCard({ job, applyToJob }) {
  return (
    <Row className="justify-content-center mb-4">
      <Col md="9" sm="6">
        <Card className="job-card">
          <CardBody>
            <CardTitle tag="h5">{job.title}</CardTitle>
            <CardText><strong>Company:</strong> {job.companyName}</CardText>
            
            <div className="mb-3 d-flex justify-content-between">
                <div>
                    <Badge color="dark" className="m-2">{job.salary !== null ? `Salary: ${job.salary}` : 'Salary: N/A'}</Badge>
                    <Badge color="secondary">{job.equity !== null ? `Equity: ${job.equity}` : 'Equity: N/A'}</Badge>
                </div>

                {
                    job.applied 
                    ? <Badge color="success" className="m-2">Applied</Badge>
                    : <Button color="primary" size="sm" onClick={() => applyToJob(job.id)}>Apply</Button>
                }
            </div>

          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}

export default JobCard;
