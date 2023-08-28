import { getValue } from ".";

describe('getValue', () => {
  it('should return empty string in case no values or no such property in values', () => {
    expect(getValue(undefined)).toEqual('');
    expect(getValue(undefined, 'someKey')).toEqual('');
    expect(getValue({ someKey: 'keyData' }, 'someAnotherKey')).toEqual('');
  });

  it('should return value of required key of passed object', () => {
    expect(getValue({ someKey: 'keyData' }, 'someKey')).toEqual('keyData');
  });
});
