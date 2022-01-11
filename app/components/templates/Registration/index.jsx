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
import { LOGIN_PAGE } from '../../../utils/routes/pages';



const Registration = ({ onSubmit }) => {
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  };

  return (
    <FormLayout title="Registration">
      <Form submit={onSubmit} initialFormState={initialValues}>
        
        <FormInput
          placeholder="First name:"
          name="firstName"/>

        <FormInput
          placeholder="Last name:" 
          name="lastName"/>

        <FormInput
          placeholder="Email:" 
          type="email" 
          name="email"/>

        <FormInput
          placeholder="Password:" 
          type="password" 
          name="password"/>

        <FormInput
          placeholder="Confirm password:" 
          type="password" 
          name="passwordConfirmation"/>

        <Link href={LOGIN_PAGE}>Already have an account?</Link>

      </Form>
    </FormLayout>
  );
};


// prop types
Registration.propTypes = {
	onSubmit: PropTypes.func.isRequired
};


export default Registration;
