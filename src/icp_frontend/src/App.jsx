import React, { useState } from 'react'
import { Button, Table, Alert, Container } from 'react-bootstrap'
import { chapter_2 } from 'declarations/chapter_2'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [members, setMembers] = useState([])
  const [isFetched, setIsFetched] = useState(false)

  const handleSubmit = async () => {
    try {
      const membersData = await chapter_2.getAllMembers()
      setMembers(membersData)
      setIsFetched(true)
      console.log('Members:', membersData)
    } catch (error) {
      console.error('Error fetching members:', error)
      setIsFetched(true)
    }
  }

  return (
    <Container className="mt-5">
      <header className="mb-4">
        <h1 className="text-center">My DAO</h1>
      </header>
      <div className="d-flex justify-content-center mb-4">
        <Button variant="primary" onClick={handleSubmit}>
          Click to see members!
        </Button>
      </div>
      {isFetched && members.length === 0 && (
        <Alert variant="warning" className="text-center">
          No members
        </Alert>
      )}
      {members.length > 0 && (
        <Table striped bordered hover className="mt-3">
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

export default App
