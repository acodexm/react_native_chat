import React, { FunctionComponent, useMemo } from 'react';
import { Button } from 'react-native';
import { Wrapper } from './profile-form.styled';
import { object, string } from 'yup';
import { t } from '@i18n';
import { Formik, FormikValues } from 'formik';
import { Container, ErrorText, FormInput } from '@components';

interface ProfileFormProps {
  onSubmit(values: FormikValues): void;
  busy: boolean;
}
const ProfileForm: FunctionComponent<ProfileFormProps> = ({ onSubmit, busy }) => {
  const validationSchema = useMemo(
    () =>
      object().shape({
        about: string().required(t('about.error.required')),
        description: string().required(t('description.error.required')),
        photoUtl: string().required(t('photoUtl.error.required')),
      }),
    []
  );
  return (
    <Wrapper>
      <Formik
        initialValues={{
          about: '',
          description: '',
          photoUrl: 'todo',
        }}
        onSubmit={({ about, description, photoUrl }) => onSubmit({ about, description, photoUrl })}
        validationSchema={validationSchema}
      >
        {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
          <Container>
            <FormInput
              value={values.about}
              testID={'about'}
              onChangeText={handleChange('about')}
              onBlur={() => setFieldTouched('about')}
              placeholder={t('about.placeholder')}
            />
            {touched.about && errors.about && (
              <ErrorText testID={'aboutError'}>{errors.about}</ErrorText>
            )}
            <FormInput
              value={values.description}
              testID={'description'}
              onChangeText={handleChange('description')}
              onBlur={() => setFieldTouched('description')}
              placeholder={t('description.placeholder')}
            />
            {touched.description && errors.description && (
              <ErrorText testID={'descriptionError'}>{errors.description}</ErrorText>
            )}
            <FormInput
              // todo change field to pick date time
              value={values.photoUrl}
              testID={'photoUrl'}
              onChangeText={handleChange('photoUrl')}
              placeholder={t('photoUrl.placeholder')}
              onBlur={() => setFieldTouched('photoUrl')}
            />
            {touched.photoUrl && errors.photoUrl && (
              <ErrorText testID={'photoUrlError'}>{errors.photoUrl}</ErrorText>
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

export default ProfileForm;
