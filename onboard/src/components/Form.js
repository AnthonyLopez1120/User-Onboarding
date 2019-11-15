import React from "react"
import { withFormik, Form, Field } from "formik"
import * as Yup from "yup"

function FormX ({values}){

    return(
        <Form>
            <Field type = "text" name= "name" placeholder ="Name" />
            <Field type = "email" name= "email" placeholder ="Email" />
            <Field type = "text" name= "password" placeholder ="Password" />
            
           <p className = "terms">Terms of Service<br/> By clicking here you agree to forfiet all earthly possessions and   <Field type = "checkbox" name="terms" checked={values.terms} /></p>

        <button>Submit</button>
         

        </Form>
    )
};

const FormikLoginForm = withFormik({
    mapPropsToValues({ name, email, password, terms }) {
      return {
        name: name || "",
        email: email || "",
        password: password || "",
        terms: terms || false
      };
      
    },
    validationSchema: Yup.object().shape({
        email: Yup.string().min(3, "Name must be longer than three characters").required("Name is required")
          .email()
          .required(),
        password: Yup.string()
          .min(6)
          .required()
      }),
      handleSubmit(values) {
        console.log(values);

      }
})
(FormX)


export default FormikLoginForm

