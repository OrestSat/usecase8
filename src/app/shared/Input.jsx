import React from 'react';

const Input = ({ label, name, value, error, onChange }) => (
  <div className='form-group'>
    <label>{label}</label>
    <input
      name={name}
      value={value}
      onChange={e => onChange(name, e.target.value)}
    />
    {error && <span className='error-message'>{error}</span>}
  </div>

);

export default Input;
