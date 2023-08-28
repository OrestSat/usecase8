import validator from 'validator';

export const FIELD_NAMES = {
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  EMAIL: 'email',
  MESSAGE: 'message'
}

export const FIELD_LABELS = {
  [FIELD_NAMES.FIRST_NAME]: 'First Name',
  [FIELD_NAMES.LAST_NAME]: 'Last Name',
  [FIELD_NAMES.EMAIL]: 'Email',
  [FIELD_NAMES.MESSAGE]: 'Message'
}

export const initialValues = {
  [FIELD_NAMES.FIRST_NAME]: '',
  [FIELD_NAMES.LAST_NAME]: '',
  [FIELD_NAMES.EMAIL]: '',
  [FIELD_NAMES.MESSAGE]: ''
}

export const validationRules = {
  required: {
    getMessage: fieldName => `The ${fieldName} field is required`,
    validate: value =>  !validator.isEmpty(value, { ignore_whitespace: true })
  },
  min: {
    getMessage: (fieldName, min) => `The ${fieldName} field must be at least ${min} characters`,
    validate: (value, min) =>  validator.isLength(value, { min: min })
  },
  email: {
    getMessage: fieldName => `The ${fieldName} field must be a valid email address`,
    validate: value =>  validator.isEmail(value)
  }
}

export const validationSchema = {
  [FIELD_NAMES.FIRST_NAME]: 'required',
  [FIELD_NAMES.LAST_NAME]: 'required',
  [FIELD_NAMES.EMAIL]: 'required|email',
  [FIELD_NAMES.MESSAGE]: 'required|min=10',
}