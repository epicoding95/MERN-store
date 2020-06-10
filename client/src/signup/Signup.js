import React from "react";
import classes from "./Signup.module.css";
import { Formik } from "formik";
import * as Yup from "yup";
import Error from "../signInError/SignInError";
/* NEED TO COME BACK TO THIS COMPONENT AND FIX THAT WHEN THE FORM IS SUBMITTED IT SHOULDNT TAKE YOU BACK TO THE LOGIN SCREEN*/
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2)
    .required("username is required"),
  email: Yup.string()
    .email()
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6)
});
const Signup = () => {
  console.log("ref changed");
  return (
    <>
      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          console.log("submitted form");
          setSubmitting(true);
          //MAKE API CALL TO CHECK IF THE USERNAME IS ALREADY IN USE
          setTimeout(() => {
            console.log(values);
            setSubmitting(false);
            resetForm();
          }, 500);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (
          <form id="signupForm" className={classes.Form}>
            <input
              type="text"
              name="email"
              className={classes.InputField}
              placeholder="email"
              onChange={handleChange}
              value={values.email}
              onBlur={handleBlur}
            />
            <Error touched={touched.email} message={errors.email} />
            <input
              type="text"
              name="username"
              className={classes.InputField}
              placeholder="username"
              onChange={handleChange}
              value={values.username}
              onBlur={handleBlur}
            />
            <Error touched={touched.username} message={errors.username} />
            <input
              type="text"
              name="password"
              className={classes.InputField}
              placeholder="password"
              onChange={handleChange}
              value={values.password}
              onBlur={handleBlur}
            />
            <Error touched={touched.password} message={errors.password} />
            <button
              disabled={isSubmitting || !values.password}
              type="submit"
              className={classes.SubmitButton}
            >
              register
            </button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Signup;
