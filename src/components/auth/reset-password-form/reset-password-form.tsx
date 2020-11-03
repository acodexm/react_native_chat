import React, { FunctionComponent, useMemo } from 'react';
import { Button } from 'react-native';
import { ErrorText, FormInput, Container } from '@components';
import { Wrapper } from './reset-password-form.styled';
import { object, string } from 'yup';
import { t } from '@i18n';
import { Formik, FormikValues } from 'formik';

interface ResetPasswordFormProps {
  onSubmit(values: FormikValues): void;

  busy: boolean;
}

const ResetPasswordForm: FunctionComponent<ResetPasswordFormProps> = ({ onSubmit, busy }) => {
  const validationSchema = useMemo(
    () =>
      object().shape({
        email: string().email(t('email.error.invalid')).required(t('email.error.required')),
      }),
    []
  );
  return (
    <Wrapper>
      <Formik
        initialValues={{
          email: '',
        }}
        onSubmit={({ email }) => onSubmit({ email })}
        validationSchema={validationSchema}
      >
        {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
          <Container>
            <FormInput
              value={values.email}
              testID={'email'}
              onChangeText={handleChange('email')}
              onBlur={() => setFieldTouched('email')}
              placeholder={t('email.placeholder')}
            />
            {touched.email && errors.email && <ErrorText>{errors.email}</ErrorText>}
            <Button
              color="#3740FE"
              testID={'submit'}
              title={t('button.reset')}
              disabled={!isValid || busy}
              onPress={handleSubmit}
            />
          </Container>
        )}
      </Formik>
    </Wrapper>
  );
};

export default ResetPasswordForm;
