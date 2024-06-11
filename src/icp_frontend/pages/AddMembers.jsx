// src/components/AddMembers.js
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'
import { Formik } from 'formik'
import {
  memberValidationSchema,
  ADD_MEMBER_INITIAL_VALUES,
} from '../constants/validationSchema'
import { chapter_2 } from '../../declarations/chapter_2'

const AddMembers = () => {
  const [successMessage, setSuccessMessage] = useState('')
  const navigate = useNavigate() // useNavigate hook for redirection

  const addMember = async (values, { setSubmitting, setErrors, resetForm }) => {
    try {
      const { name, age } = values
      const result = await chapter_2.addMember({ name, age: BigInt(age) })
      console.log('Result from addMember:', result) // Log the result for debugging

      if (result.hasOwnProperty('ok')) {
        resetForm()
        setSuccessMessage('Member added successfully!')
        setErrors({ general: '' }) // Clear any previous errors
        setTimeout(() => {
          navigate('/members') // Redirect to /members after success
        }, 2000) // Redirect after 2 seconds to show the success message briefly
      } else if (result.hasOwnProperty('err')) {
        setErrors({
          general: result.err, // Use the actual error message from the backend
        })
        setSuccessMessage('') // Clear success message if there is an error
      }
    } catch (error) {
      console.error('Error adding member:', error)
      setErrors({ general: 'An error occurred while adding the member.' })
      setSuccessMessage('') // Clear success message if there is an error
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Container>
      <h2 className="text-center my-4 fs-4">Add Member</h2>
      <Row className="justify-content-center my-4 fs-6">
        <Col md={4}>
          <Formik
            initialValues={ADD_MEMBER_INITIAL_VALUES}
            validationSchema={memberValidationSchema}
            onSubmit={addMember}
          >
            {({
              handleSubmit,
              handleChange,
              values,
              touched,
              errors,
              isSubmitting,
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="validationFormik01">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      isValid={touched.name && !errors.name}
                      isInvalid={touched.name && !!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} controlId="validationFormik02">
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                      type="number"
                      name="age"
                      value={values.age}
                      onChange={handleChange}
                      isValid={touched.age && !errors.age}
                      isInvalid={touched.age && !!errors.age}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.age}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                {errors.general && (
                  <Alert variant="danger">{errors.general}</Alert>
                )}

                {successMessage && (
                  <Alert variant="success">{successMessage}</Alert>
                )}

                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Adding...' : 'Add'}
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  )
}

export default AddMembers
