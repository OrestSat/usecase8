import React from 'react';

const Input = ({ label, name, value, error, onChange, testId }) => {
  const dataTestId = testId || name;
  return (
    <div className='form-group' data-testid={`${dataTestId}-group`}>
      <label>{label}</label>
      <input
        name={name}
        value={value}
        data-testid={`${dataTestId}-input`}
        onChange={e => onChange(name, e.target.value)}
      />
      {error && <span className='error-message' data-testid={`${dataTestId}-error`}>{error}</span>}
    </div>

  );
}

export default Input;
