import * as Yup from 'yup';

export const SignupvalidationSchema = Yup.object({
  username: Yup.string()
    .matches(/^(?=.*[A-Z])[A-Za-z0-9]*$/, 'Must have one capital letter and be alphanumeric')
    .min(6, 'Must be 6 characters or max')
    .required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string()
    .min(6, 'Must be at least 6 characters')
    .required('Required'),
});

export const LoginvalidationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string()
    .min(6, 'Must be at least 6 characters')
    .required('Required'),
});