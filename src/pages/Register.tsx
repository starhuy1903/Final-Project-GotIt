import React, { useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Form, Button, Loader } from '@ahaui/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useTypedDispatch from 'hooks/useTypedDispatch';
import { fetchUserInfo, signIn, signUp } from '../store/actions';

const schema = yup.object().shape({
  email: yup.string().required('No email provided.').email('The email is not valid'),
  password: yup
    .string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
  name: yup.string().required('No name provided.'),
});

interface SignUpFormValues {
  email: string;
  password: string;
  name: string;
}

const Register = () => {
  const dispatch = useTypedDispatch();
  const initialValues: SignUpFormValues = { email: '', password: '', name: '' };
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (user: SignUpFormValues) => {
    setLoading(true);
    const hasSignUpSucceed = await dispatch(signUp(user));
    if (hasSignUpSucceed) {
      const hasSignInSucceed = await dispatch(signIn(user));
      if (hasSignInSucceed) {
        const hasFetchSucceed = await dispatch(fetchUserInfo());
        hasFetchSucceed && navigate(location?.state?.prevPath || '/');
      }
    } else {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (user) => {
      handleSubmit(user);
    },

    validationSchema: schema,
    validateOnChange: false,
    validateOnBlur: true,
  });

  return (
    <div
      style={{ height: 'calc(100vh - 72px)' }}
      className="u-flex u-justifyContentCenter"
    >
      <div
        style={{
          backgroundImage:
              'url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)',
          backgroundSize: 'cover',
          flex: '3'
        }}
      />
      <div
        style={{ minWidth: '26rem', maxWidth: '32rem', flex: 1 }}
        className=" u-flex u-flexColumn u-justifyContentCenter u-alignItemsCenter u-paddingHorizontalMedium  u-backgroundPrimaryLight"
      >
        <form
          onSubmit={formik.handleSubmit}
          className=" u-flex u-flexColumn u-alignItemsCenter u-widthFull"
        >
          <h1 className="u-text900 u-fontBold u-marginBottomSmall">Sign up</h1>
          <Form.Group controlId="email-control" className="u-widthFull">
            <Form.Label>Email</Form.Label>
            <Form.Input
              isInvalid={Boolean(formik.touched.email && formik.errors.email)}
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <Form.Feedback type="invalid">
                {formik.errors.email}
              </Form.Feedback>
            )}
          </Form.Group>
          <Form.Group controlId="password-control" className="u-widthFull">
            <Form.Label>Password</Form.Label>
            <Form.Input
              isInvalid={Boolean(
                formik.touched.password && formik.errors.password,
              )}
              type="password"
              placeholder="Enter password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <Form.Feedback type="invalid">
                {formik.errors.password}
              </Form.Feedback>
            )}
          </Form.Group>
          <Form.Group controlId="name-control" className="u-widthFull">
            <Form.Label>Name</Form.Label>
            <Form.Input
              isInvalid={Boolean(formik.touched.name && formik.errors.name)}
              placeholder="Enter name"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <Form.Feedback type="invalid">{formik.errors.name}</Form.Feedback>
            )}
          </Form.Group>
          {loading ? (
            <Loader duration={500} />
          ) : (
            <Button variant="primary" className="u-marginTopSmall">
              <Button.Label className="u-paddingHorizontalSmall u-paddingVerticalExtraSmall">Sign up</Button.Label>
            </Button>
          )}
        </form>
        <p className="u-marginTopSmall u-text100 text-center text-gray-400">
          Login with an existing account
          {' '}
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
