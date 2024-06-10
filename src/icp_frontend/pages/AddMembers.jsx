import React from 'react'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { chapter_2 } from '../../declarations/chapter_2'

const AddMembers = () => {
  const addMember = async (values, { setSubmitting, setErrors, resetForm }) => {
    try {
      const { name, age } = values
      const result = await chapter_2.addMember({ name, age: BigInt(age) })
      if (result.ok) {
        resetForm()
        console.log('Member added!')
      } else {
        setErrors({
          general: 'The member with this principal ID already exists.',
        })
      }
    } catch (error) {
      console.error('Error adding member:', error)
      setErrors({ general: 'An error occurred while adding the member.' })
    } finally {
      setSubmitting(false)
    }
  }

  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(/^[a-zA-Z\s]+$/, 'Name should only contain letters and spaces')
      .required('Name is required'),
    age: Yup.number()
      .min(1, 'Age must be at least 1')
      .max(100, 'Age must be at most 100')
      .required('Age is required'),
  })

  return (
    <Container>
      <h2 className="text-center my-4 fs-4">Add Member</h2>
      <Row className="justify-content-center my-4 fs-6">
        <Col md={3}>
          <Formik
            initialValues={{ name: '', age: '' }}
            validationSchema={validationSchema}
            onSubmit={addMember}
          >
            {({ isSubmitting, errors }) => (
              <FormikForm>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Field name="name" type="text" className="form-control" />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-danger"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Age</Form.Label>
                  <Field name="age" type="number" className="form-control" />
                  <ErrorMessage
                    name="age"
                    component="div"
                    className="text-danger"
                  />
                </Form.Group>
                {errors.general && (
                  <Alert variant="danger">{errors.general}</Alert>
                )}
                <Button variant="success" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Adding...' : 'Add'}
                </Button>
              </FormikForm>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  )
}

export default AddMembers
