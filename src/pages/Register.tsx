import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Form, Button, Loader } from "@ahaui/react";
import { useTypedDispatch } from "../hooks";
import { fetchUserInfo, signIn, signUp } from "../store/actions";
import { Link, useLocation, useNavigate } from "react-router-dom";

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

const Register = () => {
  const dispatch = useTypedDispatch();
  const initialValues: SignUpFormValues = { email: "", password: "", name: "" };
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const formik = useFormik({
    initialValues,
    onSubmit: (user) => {
      handleSubmit(user);
    },

    validationSchema: schema,
    validateOnChange: false,
    validateOnBlur: true,
  });

  const handleSubmit = async (user: any) => {
    setLoading(true);
    const hasSignUpSucceed = await dispatch(signUp(user));
    if (hasSignUpSucceed) {
      const hasSignInSucceed = await dispatch(signIn(user));
      if(hasSignInSucceed) {
        const hasFetchSucceed = await dispatch(fetchUserInfo());
      hasFetchSucceed && navigate(location?.state?.prevPath || "/");
      }
    } else {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ height: "calc(100vh - 72px)" }}
      className="u-flex u-justifyContentCenter"
    >
      <div
        style={{ minWidth: "28rem", maxWidth: "32rem" }}
        className=" u-flex u-flexColumn u-justifyContentCenter u-alignItemsCenter u-paddingLarge u-marginLarge u-backgroundPrimaryLight u-roundedLarge"
      >
        <form
          onSubmit={formik.handleSubmit}
          className=" u-flex u-flexColumn u-alignItemsCenter"
        >
          <h1 className="u-text700 u-marginBottomSmall">Sign up</h1>
          <Form.Group controlId="email-control">
            <Form.Label>Email</Form.Label>
            <Form.Input
              isInvalid={Boolean(formik.touched.email && formik.errors.email)}
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
          <Form.Group controlId="password-control">
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
          <Form.Group controlId="name-control">
            <Form.Label>Name</Form.Label>
            <Form.Input
              isInvalid={Boolean(formik.touched.name && formik.errors.name)}
              placeholder="Enter name"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></Form.Input>
            {formik.touched.name && formik.errors.name && (
              <Form.Feedback type="invalid">{formik.errors.name}</Form.Feedback>
            )}
          </Form.Group>
          {loading ? (
            <Loader duration={500} />
          ) : (
            <Button variant="primary">
              <Button.Label>Sign up</Button.Label>
            </Button>
          )}
        </form>
        <p className="u-marginTopSmall u-text100 text-center text-gray-400">
          Don't have an account yet?{" "}
          <Link
            to="/login"
            className="text-blue-500 focus:outline-none focus:underline hover:underline"
          >
            Sign in
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Register;
