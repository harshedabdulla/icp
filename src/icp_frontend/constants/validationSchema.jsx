import * as Yup from 'yup'

export const memberValidationSchema = Yup.object({
  name: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, 'Name should only contain letters and spaces')
    .test(
      'not-only-spaces',
      'Name should not contain only spaces',
      (value) => value && value.trim().length > 0
    )
    .required('Name is required'),
  age: Yup.number()
    .integer('Age must be an integer')
    .min(1, 'Age must be at least 1')
    .max(100, 'Age must be at most 100')
    .required('Age is required'),
})

export const ADD_MEMBER_INITIAL_VALUES = {
  name: '',
  age: '',
}
