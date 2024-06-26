import React, { useState, useEffect } from 'react'
import {
  Button,
  Table,
  Alert,
  Container,
  Form,
  Row,
  Col,
  Spinner,
} from 'react-bootstrap'
import { chapter_2 } from '../../declarations/chapter_2'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'

function Members() {
  const [members, setMembers] = useState([])
  const [isFetched, setIsFetched] = useState(false)

  const handleMembers = async () => {
    try {
      const membersData = await chapter_2.getAllMembers()
      setMembers(membersData)
      console.log('Members:', membersData)
    } catch (error) {
      console.error('Error fetching members:', error)
    } finally {
      setIsFetched(true)
    }
  }

  useEffect(() => {
    handleMembers()
  }, [])

  return (
    <Container className="mt-5">
      <header className="mb-4">
        <h1 className="text-center">My DAO</h1>
      </header>

      <div className="d-flex justify-content-center">
        {!isFetched && <Spinner animation="border" variant="primary" />}
      </div>
      <Link to="/members/new">
        <div className="d-flex justify-content-left ">
          <Button variant="secondary">+</Button>
        </div>
      </Link>
      {isFetched && members.length === 0 && (
        <Alert variant="warning" className="text-center">
          No members
        </Alert>
      )}
      {isFetched && members.length > 0 && (
        <Table striped bordered hover className="mt-3 fs-6">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr key={index}>
                <td>{member.name}</td>
                <td>{member.age.toString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  )
}

export default Members
