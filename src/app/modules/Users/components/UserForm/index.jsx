import React, { useState } from 'react';

//own
import { useFormErrors } from './hooks';
import { FIELD_LABELS, FIELD_NAMES, initialValues } from './const';
import Input from '../../../../shared/Input';
import { useDispatch } from 'react-redux';
import { addUser } from '../../usersSlice';
import { getValue } from './utils';
import styles from '../../Users.module.css';

const UserForm = () => {
  const [values, setValues] = useState(initialValues);
  const { errors, validate, setFieldError } = useFormErrors();
  const dispatch = useDispatch();

  const onSubmit = () => {
    const isValid = validate(values);
    if (isValid) {
      dispatch(addUser(values));
      setValues(initialValues);
      setTimeout(() => alert('New user has been successfully added!'));
    };
  };

  const setFieldValue = (fieldName, value) => {
    setFieldError(fieldName, null);
    setValues(current => {
      return {
        ...current,
        [fieldName]: value
      }
    })
  };

  return (
    <div className={styles.formContainer}>
      <fieldset>
        <legend>User form</legend>
        <div className='form-container'>
          <Input
            label={FIELD_LABELS[FIELD_NAMES.FIRST_NAME]}
            name={FIELD_NAMES.FIRST_NAME}
            value={getValue(values, FIELD_NAMES.FIRST_NAME)}
            error={getValue(errors, FIELD_NAMES.FIRST_NAME)}
            onChange={setFieldValue}
          />
          <Input
            label={FIELD_LABELS[FIELD_NAMES.LAST_NAME]}
            name={FIELD_NAMES.LAST_NAME}
            value={getValue(values, FIELD_NAMES.LAST_NAME)}
            error={getValue(errors, FIELD_NAMES.LAST_NAME)}
            onChange={setFieldValue}
          />
          <Input
            label={FIELD_LABELS[FIELD_NAMES.EMAIL]}
            name={FIELD_NAMES.EMAIL}
            value={getValue(values, FIELD_NAMES.EMAIL)}
            error={getValue(errors, FIELD_NAMES.EMAIL)}
            onChange={setFieldValue}
          />
          <Input
            label={FIELD_LABELS[FIELD_NAMES.MESSAGE]}
            name={FIELD_NAMES.MESSAGE}
            value={getValue(values, FIELD_NAMES.MESSAGE)}
            error={getValue(errors, FIELD_NAMES.MESSAGE)}
            onChange={setFieldValue}
          />
          <button //Submit button is always enabled. But submit action won't proceed if the form is invalid
            onClick={onSubmit}>
            Submit
          </button>
        </div>
      </fieldset>
    </div>
  );
}

export default UserForm;
