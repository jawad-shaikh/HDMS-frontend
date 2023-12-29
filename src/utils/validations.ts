import * as yup from "yup";

export const loginSchema = yup.object().shape({
    email: yup.string().email('Email address is not valid').required('Email is required'),
    password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});
export const registerSchema = yup.object().shape({
    firstName: yup.string().required('First name is required').min(2, 'First name must be at least 2 characters'),
    lastName: yup.string().required('Last name is required').min(2, 'Last name must be at least 2 characters'),
    departmentId: yup.string().required('Department is required'),
    employeeNumber: yup.string().required('Employee Number is required'),
    idNumber: yup.string().required('ID number is required'),
    email: yup.string().email('Invalid email address').required('Email is required'),
    password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), undefined], 'Passwords must match').required('Confirm password is required'),
  });

  export const userSchema = yup.object().shape({
    firstName: yup.string().required('First name is required').min(2, 'First name must be at least 2 characters'),
    lastName: yup.string().required('Last name is required').min(2, 'Last name must be at least 2 characters'),
    employeeNumber: yup.string().required('Employee Number is required'),
    role: yup.string().required('Role is required'),
    idNumber: yup.string().required('ID number is required'),
    email: yup.string().email('Invalid email address').required('Email is required'),
    password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

export const departmentSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
});

export const requiredDocumentSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  documentType: yup.string().required('Document type is required'),
});

export const uploadDocumentSchema = yup.object().shape({
  purpose: yup.string().required('Purpose is required'),
  description: yup.string().required('Note is required'),
  expireDate: yup.date().required('Date proposed is required'),
});