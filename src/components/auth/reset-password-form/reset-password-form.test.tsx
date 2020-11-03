import React from 'react';
import { act, fireEvent } from '@testing-library/react-native';
import ResetPasswordForm from '@components/auth/reset-password-form/reset-password-form';
import { renderWithTheme } from '../../../../test/support/mocked-component';

describe('test reset password form', () => {
  it('form submit email', async () => {
    const mock_onSubmit = jest.fn();
    const { getByTestId } = renderWithTheme(() => (
      <ResetPasswordForm onSubmit={mock_onSubmit} busy={false} />
    ));
    const emailField = getByTestId('email');
    const submit = getByTestId('submit');
    await act(async () => {
      fireEvent.changeText(emailField, 'example@email.com');
      fireEvent.press(submit);
    });
    expect(mock_onSubmit).toBeCalledWith({ email: 'example@email.com' });
  });
});
