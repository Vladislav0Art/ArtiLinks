import React from 'react';
import PropTypes from 'prop-types';
// layouts
import { FormLayout } from '../../layouts';
// elements
import { FormInput } from '../../elements';
// modules
import { Form } from '../../modules';




const RecoveryChangePassword = ({ onSubmit }) => {
  const initialValues = {
    password: "",
    passwordConfirmation: ""
  };

  return (
    <FormLayout title="Password recovering">
      <Form submit={onSubmit} initialFormState={initialValues}>

        <FormInput
          placeholder='New password:'
          name='password'
          type='password'/>

        <FormInput
          placeholder='Confirm new password:'
          name='passwordConfirmation'
          type='password'/>

      </Form>
    </FormLayout>
  );
};


// prop types
RecoveryChangePassword.propTypes = {
	onSubmit: PropTypes.func.isRequired
};


export default RecoveryChangePassword;
