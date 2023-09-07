import React from 'react';
import { Card, CardBody, CardTitle, ListGroup, ListGroupItem, Badge, Button } from 'reactstrap';

function JobCardList({ jobs, applications, applyToJob }) {
    return (
        <div className="JobCardList">
            <Card className="mt-4">
                <CardBody>
                    <CardTitle tag="h3">Jobs Offered:</CardTitle>
                    <ListGroup>
                        {jobs && jobs.length > 0 
                            ? jobs.map(job => (
                                <ListGroupItem key={job.id} className="mb-1 d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6 className="d-inline-block mr-2">{job.title}:</h6>
                                        <Badge color="dark" className="m-2">Salary: {job.salary !== null ? job.salary : 'N/A'}</Badge>
                                        <Badge color="secondary">Equity: {job.equity !== null ? job.equity : 'N/A'}</Badge>
                                    </div>
                                    {
                                      applications.includes(job.id)
                                      ? <Badge color="success" className="ml-3">Applied</Badge>
                                      : <Button color="primary" size="sm" onClick={() => applyToJob(job.id)}>Apply</Button>
                                    }
                                </ListGroupItem>
                              ))
                            : <p>No jobs listed for this company.</p>
                        }
                    </ListGroup>
                </CardBody>
            </Card>
        </div>
    );
}

export default JobCardList;
