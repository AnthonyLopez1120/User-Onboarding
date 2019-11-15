import React, {useState, useEffect} from "react"
import axios from "axios"
import { withFormik, Form, Field } from "formik"
import * as Yup from "yup"

function FormX ({values, errors, touched, status}){
    const [users, setUsers] = useState([]);
    useEffect(() => {
        status && setUsers([...users, status])}, [status, users]);

    return(
        <>
        <Form>
            {touched.name&&errors.name}
            <Field type = "text" name= "name" placeholder ="Name" />
            {touched.email&&errors.email}
            <Field type = "email" name= "email" placeholder ="Email" />
            {touched.password&&errors.password}
            <Field type = "text" name= "password" placeholder ="Password" />
            
           <p className = "terms">Terms of Service<br/> By clicking here you agree to forfiet all earthly possessions and dedicate your life to servitude   <Field type = "checkbox" name="terms" checked={values.terms} /></p>

        <button type = "submit">Submit</button>


        </Form>
        <div>
            <h2>The Damned</h2>
            {users.map(user =>(
                <p key = {user.email}>{`${user.name} ${user.email}`}</p>
            ))}
        </div>
        </>
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
        name: Yup.string()
        .min(3, "Name must be longer than three characters").required("Name is required"),
        
        email: Yup.string()
          .email("Email invalid")
          .required("Email is required"),
          
        password: Yup.string()
          .min(6, "Password needs to be longer than 6 characteres")
          .required("Password is required")
      }),

      handleSubmit(values, { resetForm, setSubmitting, setStatus, setErrors }) {
        console.log(values);
        values.email === "waffle@syrup.com"
        ? setErrors({email: "That email is already taken."})
    
        : axios
        .post("https://reqres.in/api/users", values)
        .then(response => {
            console.log("Success!", response);
            let user = response.data;
            setStatus(user);
            resetForm();
            setSubmitting(false);
            setStatus();
        })
        .catch(error => {
            console.log("Mission failed.", error);
            setSubmitting(false);
        });
      }    
})(FormX)


export default FormikLoginForm

