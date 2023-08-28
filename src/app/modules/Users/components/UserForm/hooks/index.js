import { useState } from 'react';

//own
import { FIELD_LABELS, validationRules, validationSchema } from '../const';

export const useFormErrors = () => {
  const [errors, setErrors] = useState(null);

  const setFieldError = (fieldName, errorMessage) => {
    setErrors(current => {
      return {
        ...current,
        [fieldName]: errorMessage
      }
    })
  };

  const validate = values => {
    let isValid = true;
    for (const [fieldName, rulesString] of Object.entries(validationSchema)) {
      let errorMessage = null;
      const rules = rulesString.split('|');
      for (let i = 0; i < rules.length; i++) {
        const [ruleKey, ruleValue] = rules[i].split('=');
        const validationRule = validationRules[ruleKey];
        if (validationRule && !validationRule.validate(values[fieldName], ruleValue)) {
          isValid = false;
          errorMessage = validationRule.getMessage(FIELD_LABELS[fieldName], ruleValue);
          break;
        }
      }
      setFieldError(fieldName, errorMessage);
    }
    return isValid;
  }

  const isValid = () => {
    return errors && !Object.values(errors).some(error => !!error)
  }

  return {
    errors,
    isValid,
    validate,
    setFieldError
  }
}
