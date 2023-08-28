import React from 'react';
import { fireEvent, render, within } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

const wrapper = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}

test('Should render all components', () => {
  const { getByTestId } = render(<App />, { wrapper });

  expect(getByTestId('user-form')).toBeInTheDocument();
  expect(getByTestId('user-list')).toBeInTheDocument();
});

test('Should display new record in table after success form submit', () => {
  const { getByTestId, getAllByTestId } = render(<App />, { wrapper });

  fireEvent.focus(getByTestId('firstName-input'));
    fireEvent.change(getByTestId('firstName-input'), { target: { value: 'firstName 1' } });

    fireEvent.focus(getByTestId('lastName-input'));
    fireEvent.change(getByTestId('lastName-input'), { target: { value: 'lastName 1' } });

    fireEvent.focus(getByTestId('email-input'));
    fireEvent.change(getByTestId('email-input'), { target: { value: 'someEmail@test.com' } });

    fireEvent.focus(getByTestId('message-input'));
    fireEvent.change(getByTestId('message-input'), { target: { value: 'Some message 1' } });
    fireEvent.click(getByTestId('submit-btn'));

    expect(getAllByTestId('data-row')).toHaveLength(1);

    const firstRow = getAllByTestId('data-row')[0];
    expect(within(firstRow).getByText('firstName 1')).toBeInTheDocument();
    expect(within(firstRow).getByText('lastName 1')).toBeInTheDocument();
    expect(within(firstRow).getByText('someEmail@test.com')).toBeInTheDocument();
    expect(within(firstRow).getByText('Some message 1')).toBeInTheDocument();
});
