import * as Yup from 'yup';

export const initialValues = {
  name: '',
  email: '',
  password: '',
};

export const validationSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Min 2 characters').required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Min 6 characters').required('Password is required'),
});
