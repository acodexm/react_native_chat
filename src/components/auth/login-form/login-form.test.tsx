import React from 'react';
import { act, fireEvent } from '@testing-library/react-native';
import LoginForm from '@components/auth/login-form/login-form';
import { renderWithTheme } from '../../../../test/support/mocked-component';

describe('test login form', () => {
  it('form submit email and password', async () => {
    const mock_onSubmit = jest.fn();
    const mock_onGoogle = jest.fn();
    const { getByTestId } = renderWithTheme(
      <LoginForm onSubmit={mock_onSubmit} onGoogleLogin={mock_onGoogle} busy={false} />
    );
    const emailField = getByTestId('email');
    const passwordField = getByTestId('password');
    const submit = getByTestId('submit');
    await act(async () => {
      fireEvent.changeText(emailField, 'example@email.com');
      fireEvent.changeText(passwordField, 'password');
      fireEvent.press(submit);
    });
    expect(mock_onSubmit).toBeCalledWith({ email: 'example@email.com', password: 'password' });
  });
});
