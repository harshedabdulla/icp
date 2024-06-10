import React, { useState } from 'react'
import {
  Button,
  Table,
  Alert,
  Container,
  Form,
  Row,
  Col,
} from 'react-bootstrap'
import { chapter_2 } from 'declarations/chapter_2'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [members, setMembers] = useState([])
  const [isFetched, setIsFetched] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newMember, setNewMember] = useState({ name: '', age: '' })
  const [errorMessage, setErrorMessage] = useState('')

  const handleMembers = async () => {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewMember((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const addMember = async () => {
    try {
      const { name, age } = newMember
      if (name && age) {
        const result = await chapter_2.addMember({ name, age: BigInt(age) })
        if (result.ok) {
          setNewMember({ name: '', age: '' })
          setShowAddForm(false)
          setErrorMessage('')
          console.log('Member added!')
          handleMembers() // Refresh the member list after adding
        } else {
          setErrorMessage('The member with this principal ID already exists.')
        }
      }
    } catch (error) {
      console.error('Error adding member:', error)
      setErrorMessage('An error occurred while adding the member.')
    }
  }

  return (
    <Container className="mt-5">
      <header className="mb-4">
        <h1 className="text-center">My DAO</h1>
      </header>
      <div className="d-flex justify-content-center mb-4">
        <Button variant="primary" onClick={handleMembers}>
          Click to see members!
        </Button>
      </div>
      {isFetched && members.length === 0 && (
        <Alert variant="warning" className="text-center">
          No members
        </Alert>
      )}
      {members.length > 0 && (
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
      <div className="d-flex justify-content-center my-4">
        <Button variant="primary" onClick={() => setShowAddForm(true)}>
          Add members
        </Button>
      </div>
      {showAddForm && (
        <Row className="justify-content-center my-4 fs-6">
          <Col md={3}>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={newMember.name}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  name="age"
                  value={newMember.age}
                  onChange={handleInputChange}
                />
              </Form.Group>
              {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
              <Button variant="success" onClick={addMember}>
                Add
              </Button>
            </Form>
          </Col>
        </Row>
      )}
    </Container>
  )
}

export default App
