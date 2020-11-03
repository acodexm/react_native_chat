import React, { FunctionComponent, useMemo } from 'react';
import { Button } from 'react-native';
import { ErrorText, FormInput, Container } from '@components';
import { Wrapper } from './login-form.styled';
import { Formik, FormikValues } from 'formik';
import { object, string } from 'yup';
import { t } from '@i18n';

interface LoginFormProps {
  onSubmit(values: FormikValues): void;
  onGoogleLogin(): void;
  busy: boolean;
}
const LoginForm: FunctionComponent<LoginFormProps> = ({ onSubmit, busy, onGoogleLogin }) => {
  const validationSchema = useMemo(
    () =>
      object().shape({
        email: string().email(t('email.error.invalid')).required(t('email.error.required')),
        password: string().required(t('password.error.required')),
      }),
    []
  );
  return (
    <Wrapper>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={({ email, password }) => onSubmit({ email, password })}
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
            {touched.email && errors.email && (
              <ErrorText testID={'emailError'}>{errors.email}</ErrorText>
            )}
            <FormInput
              value={values.password}
              testID={'password'}
              onChangeText={handleChange('password')}
              placeholder={t('password.placeholder')}
              onBlur={() => setFieldTouched('password')}
              secureTextEntry={true}
            />
            {touched.password && errors.password && (
              <ErrorText testID={'passwordError'}>{errors.password}</ErrorText>
            )}
            <Button
              color="#3740FE"
              testID={'submit'}
              title={t('button.login')}
              disabled={!isValid || busy}
              onPress={handleSubmit}
            />
            <Button
              color="#3740FE"
              testID={'loginGoogle'}
              title={t('button.loginGoogle')}
              disabled={busy}
              onPress={onGoogleLogin}
            />
          </Container>
        )}
      </Formik>
    </Wrapper>
  );
};

export default LoginForm;
