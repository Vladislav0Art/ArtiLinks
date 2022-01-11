import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
// layouts
import { FormLayout } from '../../layouts';
// elements
import { FormInput } from '../../elements'; 
// modules
import { Form } from '../../modules';
// utils/routes
import { REGISTRATION_PAGE, RECOVERY_PAGE } from '../../../utils/routes/pages';



const Login = ({ onSubmit }) => {
  const initialValues = {
    email: '',
    password: ''
  };

  return (
    <FormLayout title="Login">
      <Form submit={onSubmit} initialFormState={initialValues}>

        <FormInput
          placeholder="Email:"
          type="email"
          name="email"/>

        <FormInput
          placeholder="Password:"
          type="password"
          name="password"/>

        <Link href={REGISTRATION_PAGE}>Do not have an account yet?</Link>
        <Link href={RECOVERY_PAGE}>Forgot your password?</Link>

      </Form>
    </FormLayout>
  );
};


// prop types
Login.propTypes = {
	onSubmit: PropTypes.func.isRequired
};


export default Login;
