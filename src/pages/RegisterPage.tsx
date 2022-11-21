import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Form, Button } from "@ahaui/react";
import useThunkDispatch from "../hooks/useThunkDispatch";
import { signUp } from "../store/actions";

const schema = yup.object().shape({
  email: yup.string().email("The email is not valid"),
  password: yup
    .string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
});

interface SignUpFormValues {
  email: string;
  password: string;
  name: string;
}

const RegisterPage = () => {
  const dispatch = useThunkDispatch();
  const initialValues: SignUpFormValues = { email: "", password: "", name: "" };

  const formik = useFormik({
    initialValues,
    onSubmit: (user, { resetForm }) => {
      console.log(user);

      dispatch(signUp(user));
      resetForm();
    },

    validationSchema: schema,
    validateOnChange: false,
    validateOnBlur: true,
  });
  console.log(formik.isSubmitting);

  return (
    <div className="u-screenHeightFull">
      <div className="">
        <form onSubmit={formik.handleSubmit}>
          <Form.Group controlId="exampleForm.State5">
            <Form.Label>Email</Form.Label>
            <Form.Input
              isInvalid={Boolean(
                formik.touched.password && formik.errors.password
              )}
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></Form.Input>
            {formik.touched.email && formik.errors.email && (
              <Form.Feedback type="invalid">
                {formik.errors.email}
              </Form.Feedback>
            )}
          </Form.Group>
          <Form.Group controlId="exampleForm.State5">
            <Form.Label>Password</Form.Label>
            <Form.Input
              isInvalid={Boolean(
                formik.touched.password && formik.errors.password
              )}
              type="password"
              placeholder="Enter password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></Form.Input>
            {formik.touched.password && formik.errors.password && (
              <Form.Feedback type="invalid">
                {formik.errors.password}
              </Form.Feedback>
            )}
          </Form.Group>
          <Form.Group controlId="exampleForm.State5">
            <Form.Label>Name</Form.Label>
            <Form.Input
              isInvalid={Boolean(formik.touched.name && formik.errors.name)}
              type="text"
              placeholder="Enter name"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></Form.Input>
            {formik.touched.name && formik.errors.name && (
              <Form.Feedback type="invalid">{formik.errors.name}</Form.Feedback>
            )}
          </Form.Group>
          <Button variant="primary" disabled={formik.isSubmitting}>
            <Button.Label>Sign up</Button.Label>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
