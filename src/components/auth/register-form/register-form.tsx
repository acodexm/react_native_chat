import React, { FunctionComponent, useMemo } from 'react';
import { Button } from 'react-native';
import { Wrapper } from './register-form.styled';
import { ErrorText, FormInput, Container } from '@components';
import { object, ref, string } from 'yup';
import { t } from '@i18n';
import { Formik, FormikValues } from 'formik';

interface RegisterFormProps {
  onSubmit(values: FormikValues): void;
  busy: boolean;
}
const RegisterForm: FunctionComponent<RegisterFormProps> = ({ onSubmit, busy }) => {
  const validationSchema = useMemo(
    () =>
      object().shape({
        email: string().email(t('email.error.invalid')).required(t('email.error.required')),
        password: string().required(t('password.error.required')),
        passwordCheck: string()
          .oneOf([ref('password'), undefined], t('passwordCheck.error.not_match'))
          .required(t('passwordCheck.error.required')),
      }),
    []
  );
  return (
    <Wrapper>
      <Formik
        initialValues={{
          email: '',
          password: '',
          passwordCheck: '',
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
            <FormInput
              value={values.passwordCheck}
              testID={'passwordCheck'}
              onChangeText={handleChange('passwordCheck')}
              placeholder={t('passwordCheck.placeholder')}
              onBlur={() => setFieldTouched('passwordCheck')}
              secureTextEntry={true}
            />
            {touched.passwordCheck && errors.passwordCheck && (
              <ErrorText testID={'passwordCheckError'}>{errors.passwordCheck}</ErrorText>
            )}
            <Button
              color="#3740FE"
              testID={'submit'}
              title={t('button.register')}
              disabled={!isValid || busy}
              onPress={handleSubmit}
            />
          </Container>
        )}
      </Formik>
    </Wrapper>
  );
};

export default RegisterForm;
