import React from "react";
import { withFormik, Form as FormikForm, Field } from "formik";
import * as Yup from 'yup';
import axios from 'axios';

/*
- Name
- Email
- Password
- Terms of Service (checkbox)
- A Submit button to send our form data to the server.
*/

const OnboardForm = ({values, touched, errors}) => {
  return (
    <FormikForm>
      <Field type="text" name="name" placeholder="Name" />
      {touched.name && errors.name && <p className="error">{errors.name}</p>}

      <Field type="text" name="email" placeholder="Email" />
      {touched.email && errors.email && <p className="error">{errors.email}</p>}

      <Field type="password" name="password" placeholder="Password" />
      {touched.password && errors.password && <p className="error">{errors.password}</p>}

      <label>
          I have read and agree to the Terms of Service
          <Field
           type="checkbox"
           name="tos"
           checked={values.tos}
          />
      </label>
      {touched.tos && errors.tos && <p className="error">{errors.tos}</p>}


      <button>Submit!</button>
    </FormikForm>
  );
};

const FormikOnboardForm = withFormik({
    mapPropsToValues({name, email, password, tos}){
        return {
            name: name || '',
            email: email || '',
            password: password || '',
            tos: tos || false
        };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required('Name is a required field'),
        email: Yup.string().email('Input a valid email').required('Email is a required field'),
        password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is a required field'),
        tos: Yup.boolean().oneOf([true], 'Must accept Terms of Service')
    }),

    handleSubmit(values){
        // console.log('Values in handleSubmit', values);
        axios.post('https://reqres.in/api/users', values)
        .then((response)=>{
            console.log('RESPONSE', response)
        })
        .catch((error)=>{
            console.log('ERROR', error)
        })
    }
})(OnboardForm);

export default FormikOnboardForm;
