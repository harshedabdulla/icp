import React, { useState } from 'react'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'
import { chapter_2 } from '../../declarations/chapter_2'

const AddMembers = () => {
  const [newMember, setNewMember] = useState({ name: '', age: '' })
  const [errorMessage, setErrorMessage] = useState('')
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
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewMember((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }
  return (
    <div>
      <Container>
        <h2 className="text-center my-4 fs-4">Add Member</h2>
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
      </Container>
    </div>
  )
}

export default AddMembers
