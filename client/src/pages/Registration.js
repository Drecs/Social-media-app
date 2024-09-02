import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';


function Registration() {
  const initialValues = {
    UserName: '',
    Password: '',
  };

  const validationSchema = Yup.object().shape({
    UserName: Yup.string().min(3).max(15).required('Username is required'),
    Password: Yup.string().min(4).max(20).required('Password is required'),
  });

  const onSubmit = (data) => {
    axios.post('http://localhost:3001/auth', data).then(() => {
      console.log(data);
    });
  };

  return (
    <div className="RegistrationPage">
      <div className="card">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <label>Username:</label>
            <ErrorMessage name="UserName" component="span" className="error-message" />
            <Field
              autoComplete="off"
              id="inputRegistration"
              name="UserName"
              placeholder="(EX. John123...)"
            />

            <label>Password:</label>
            <ErrorMessage name="Password" component="span" className="error-message" />
            <Field
              autoComplete="off"
              type="password"
              id="inputRegistration"
              name="Password"
              placeholder="(Your Password...)"
            />
            <button type="submit">Register</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Registration;
