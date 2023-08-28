import React from 'react';
import { render, within } from '@testing-library/react';
import UserList from '.';
import { useSelector } from 'react-redux';


jest.mock('react-redux');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('UserList', () => {
  it('should render all column (First Name, Last Name, Email, Message)', () => {

    const mockStore = {
      users: []
    };
    useSelector.mockImplementation(cb => cb(mockStore));
    const { getByText, getByTestId } = render(<UserList />);
    expect(getByTestId('user-list')).toBeInTheDocument();
    expect(getByText('First Name')).toBeInTheDocument();
    expect(getByText('Last Name')).toBeInTheDocument();
    expect(getByText('Email')).toBeInTheDocument();
    expect(getByText('Message')).toBeInTheDocument();
  });

  it('should render all data from store', () => {

    const mockStore = {
      users: [{
        firstName: 'first name 1',
        lastName: 'last name 1',
        email: 'email 1',
        message: 'message 1'
      }, {
        firstName: 'first name 2',
        lastName: 'last name 2',
        email: 'email 2',
        message: 'message 2'
      }]
    };
    useSelector.mockImplementation(cb => cb(mockStore));
    const { getAllByTestId } = render(<UserList />);
    expect(getAllByTestId('data-row')).toHaveLength(2);

    const firstRow = getAllByTestId('data-row')[0];
    expect(within(firstRow).getByText('first name 1')).toBeInTheDocument();
    expect(within(firstRow).getByText('last name 1')).toBeInTheDocument();
    expect(within(firstRow).getByText('email 1')).toBeInTheDocument();
    expect(within(firstRow).getByText('message 1')).toBeInTheDocument();
  });

});