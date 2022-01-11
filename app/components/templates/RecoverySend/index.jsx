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
import { REGISTRATION_PAGE } from '../../../utils/routes/pages';



const RecoverySend = ({ onSubmit }) => {
  const initialValues = {
    email: ''
  };
  
  return (
    <FormLayout title="Password recovering">

      <Form submit={onSubmit} initialFormState={initialValues}>

        <FormInput
          placeholder="Email:" 
          type="email" 
          name="email"/>

        <Link href={REGISTRATION_PAGE}>Do not have an account yet?</Link>

      </Form>
    </FormLayout>
  );
};


// prop types
RecoverySend.propTypes = {
	onSubmit: PropTypes.func.isRequired
};


export default RecoverySend;
