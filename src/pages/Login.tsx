import React, { useState } from 'react';
import { Form, Button, Loader } from '@ahaui/react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useTypedDispatch from 'hooks/useTypedDispatch';
import { fetchUserInfo, signIn } from '../store/actions/authActions';

const schema = yup.object().shape({
  email: yup
    .string()
    .required('No email provided.')
    .email('The email is not valid'),
  password: yup.string().required('No password provided.'),
});

interface LoginFormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const dispatch = useTypedDispatch();
  const initialValues: LoginFormValues = { email: '', password: '' };
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (user: LoginFormValues) => {
    setLoading(true);
    const hasSignInSucceed = await dispatch(signIn(user));
    if (hasSignInSucceed) {
      const hasFetchSucceed = await dispatch(fetchUserInfo());
      hasFetchSucceed && navigate(location?.state?.prevPath || '/');
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
        style={{ minWidth: '26rem', maxWidth: '32rem', flex: '1' }}
        className=" u-flex u-flexColumn u-justifyContentCenter u-alignItemsCenter u-paddingHorizontalMedium u-backgroundPrimaryLight"
      >
        <form
          onSubmit={formik.handleSubmit}
          className="u-flex u-flexColumn u-alignItemsCenter u-widthFull"
        >
          <h1 className="u-text900 u-fontBold u-marginBottomSmall">Sign in</h1>
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
          {loading ? (
            <Loader duration={500} />
          ) : (
            <Button variant="primary" className="u-marginTopSmall">
              <Button.Label className="u-paddingHorizontalLarge">Login</Button.Label>
            </Button>
          )}
        </form>
        <p className="u-marginTopSmall u-text100 text-center text-gray-400">
          {'Don\'t have an account yet?'}
          {' '}
          <Link
            to="/register"
            className="text-blue-500 focus:outline-none focus:underline hover:underline"
          >
            Sign up
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;
