import React from 'react';
import { act, fireEvent } from '@testing-library/react-native';
import RegisterForm from '@components/auth/register-form/register-form';
import { renderWithTheme } from '../../../../test/support/mocked-component';

describe('test register form', () => {
  it('form submit email and password', async () => {
    const mock_onSubmit = jest.fn();
    const { getByTestId } = renderWithTheme(() => (
      <RegisterForm onSubmit={mock_onSubmit} busy={false} />
    ));
    const emailField = getByTestId('email');
    const passwordField = getByTestId('password');
    const passwordCheckField = getByTestId('passwordCheck');
    const submit = getByTestId('submit');
    await act(async () => {
      fireEvent.changeText(emailField, 'example@email.com');
      fireEvent.changeText(passwordField, 'password');
      fireEvent.changeText(passwordCheckField, 'password');
      fireEvent.press(submit);
    });
    expect(mock_onSubmit).toBeCalledWith({ email: 'example@email.com', password: 'password' });
  });
});
