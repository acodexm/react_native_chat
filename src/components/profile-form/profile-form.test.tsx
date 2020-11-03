import React from 'react';
import { act, fireEvent } from '@testing-library/react-native';
import ProfileForm from '@components/profile-form/profile-form';
import { renderWithTheme } from '../../../test/support/mocked-component';

describe('test register form', () => {
  it('form submit about and description', async () => {
    const mock_onSubmit = jest.fn();
    const { getByTestId } = renderWithTheme(() => (
      <ProfileForm onSubmit={mock_onSubmit} busy={false} />
    ));
    const aboutField = getByTestId('about');
    const descriptionField = getByTestId('description');
    const photoUrlField = getByTestId('photoUrl');
    const submit = getByTestId('submit');
    await act(async () => {
      fireEvent.changeText(aboutField, 'about me');
      fireEvent.changeText(descriptionField, 'user description');
      // todo pick profile picture
      fireEvent.press(submit);
    });
    expect(mock_onSubmit).toBeCalledWith({
      about: 'about me',
      description: 'user description',
      photoUrl: 'todo',
    });
  });
});
