import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import UserForm from '.';
import { addUser } from '../../usersSlice';
import { useDispatch } from 'react-redux';


jest.mock('react-redux');
jest.mock('../../usersSlice');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('UserForm', () => {
  it('should render all form controls (Inputs: (First Name, Last Name, Email, Message), Submit btn)', () => {


    const { getByTestId } = render(<UserForm />);
    expect(getByTestId('user-form')).toBeInTheDocument();
    expect(getByTestId('firstName-group')).toBeInTheDocument();
    expect(getByTestId('lastName-group')).toBeInTheDocument();
    expect(getByTestId('email-group')).toBeInTheDocument();
    expect(getByTestId('message-group')).toBeInTheDocument();
    expect(getByTestId('submit-btn')).toBeInTheDocument();
    expect(getByTestId('submit-btn')).not.toBeDisabled()
  });

  it('should highlight error for invalid fields after submit button is pressed and for is invalid', () => {
    const { getByTestId } = render(<UserForm />);
    fireEvent.click(getByTestId('submit-btn'));
    expect(addUser).not.toBeCalled();
    
    expect(getByTestId('firstName-error')).toHaveTextContent('The First Name field is required');
    expect(getByTestId('lastName-group')).toHaveTextContent('The Last Name field is required');
    expect(getByTestId('email-group')).toHaveTextContent('The Email field is required');
    expect(getByTestId('message-group')).toHaveTextContent('The Message field is required');
  });

  it('should call addUser after submit button is pressed and for is valid', () => {
    const expectedParams = {
      firstName: 'firstName 1',
      lastName: 'lastName 1',
      email: 'someEmail@test.com',
      message: 'Some message 1',
    };
    useDispatch.mockReturnValue(jest.fn());
    const { getByTestId } = render(<UserForm />);

    fireEvent.focus(getByTestId('firstName-input'));
    fireEvent.change(getByTestId('firstName-input'), { target: { value: 'firstName 1' } });

    fireEvent.focus(getByTestId('lastName-input'));
    fireEvent.change(getByTestId('lastName-input'), { target: { value: 'lastName 1' } });

    fireEvent.focus(getByTestId('email-input'));
    fireEvent.change(getByTestId('email-input'), { target: { value: 'someEmail@test.com' } });

    fireEvent.focus(getByTestId('message-input'));
    fireEvent.change(getByTestId('message-input'), { target: { value: 'Some message 1' } });
    fireEvent.click(getByTestId('submit-btn'));
    expect(addUser).toBeCalledWith(expectedParams);
    
  });

  it('input validation message should disappear on value change', () => {
    const { getByTestId, queryByTestId } = render(<UserForm />);

    fireEvent.click(getByTestId('submit-btn'));

    expect(getByTestId('firstName-error')).toHaveTextContent('The First Name field is required');
    fireEvent.focus(getByTestId('firstName-input'));
    fireEvent.change(getByTestId('firstName-input'), { target: { value: 'firstName 1' } });

    expect(queryByTestId('firstName-error')).not.toBeInTheDocument();
    
  });

  it('Should validate email (required, valid)', () => {
    const { getByTestId, queryByTestId } = render(<UserForm />);

    fireEvent.click(getByTestId('submit-btn'));
    expect(getByTestId('email-error')).toHaveTextContent('The Email field is required');

    fireEvent.focus(getByTestId('email-input'));
    fireEvent.change(getByTestId('email-input'), { target: { value: 'someInvalidEmail' } });

    fireEvent.click(getByTestId('submit-btn'));
    expect(getByTestId('email-error')).toHaveTextContent('The Email field must be a valid email address');

    fireEvent.focus(getByTestId('email-input'));
    fireEvent.change(getByTestId('email-input'), { target: { value: 'some@valid.email' } });

    fireEvent.click(getByTestId('submit-btn'));
    expect(queryByTestId('email-error')).not.toBeInTheDocument();
    
  });

  it('Should validate MESSAGE (required, minLength >= 10)', () => {
    const { getByTestId, queryByTestId } = render(<UserForm />);

    fireEvent.click(getByTestId('submit-btn'));
    expect(getByTestId('message-error')).toHaveTextContent('The Message field is required');

    fireEvent.focus(getByTestId('message-input'));
    fireEvent.change(getByTestId('message-input'), { target: { value: 'shortText' } });

    fireEvent.click(getByTestId('submit-btn'));
    expect(getByTestId('message-error')).toHaveTextContent('The Message field must be at least 10 characters');

    fireEvent.focus(getByTestId('message-input'));
    fireEvent.change(getByTestId('message-input'), { target: { value: 'Some long message' } });

    fireEvent.click(getByTestId('submit-btn'));
    expect(queryByTestId('message-error')).not.toBeInTheDocument();
    
  });

});