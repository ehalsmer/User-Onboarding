import React from "react";
import { withFormik, Form as FormikForm, Field } from "formik";

/*
- Name
- Email
- Password
- Terms of Service (checkbox)
- A Submit button to send our form data to the server.
*/

const OnboardForm = (values) => {
  return (
    <FormikForm>
      <Field type="text" name="name" placeholder="Name" />
      <Field type="text" name="email" placeholder="Email" />
      <Field type="password" name="password" placeholder="Password" />
      <label>
          I have read and agree to the Terms of Service
          <Field
           type="checkbox"
           name="tos"
           checked={values.tos}
          />
      </label>

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
    handleSubmit(values){
        console.log('Values in handleSubmit', values);
    }
})(OnboardForm);

export default FormikOnboardForm;
