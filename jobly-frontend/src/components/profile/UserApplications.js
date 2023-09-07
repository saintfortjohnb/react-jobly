import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, ListGroup, ListGroupItem, Badge} from 'reactstrap';
import JoblyApi from '../api/api';

function UserApplications({ applications, unapplyFromJob }) {
    const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function fetchJobs() {
      const fetchedJobs = [];
      
      for (let id of applications) {
        const job = await JoblyApi.getJobById(id);
        fetchedJobs.push(job);
      }

      setJobs(fetchedJobs);
    }
    
    fetchJobs();
  }, [applications]);

  return (
    <Card className="mt-4">
      <CardBody>
        <CardTitle tag="h4">Your Applications</CardTitle>
        <ListGroup>
          {jobs.length === 0 ? (
            <ListGroupItem>You haven't applied to any jobs yet.</ListGroupItem>
          ) : (
            jobs.map(job => (
              <ListGroupItem key={job.id}>
                <h6 className="d-inline-block mr-2">{job.title} at <strong>{job.company.name} : </strong></h6>
                <Badge color="dark" className="m-2">Salary: ${job.salary !== null ? job.salary : 'N/A'}</Badge>
                <Badge color="secondary" className="m-2">Equity: {job.equity !== null ? job.equity : 'N/A'}</Badge>
                <Badge color="danger" className="m-3" onClick={() => unapplyFromJob(job.id)} style={{ cursor: 'pointer' }}>Unapply</Badge>
              </ListGroupItem>
            ))
          )}
        </ListGroup>
      </CardBody>
    </Card>
  );
}

export default UserApplications;
