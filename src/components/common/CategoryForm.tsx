import React, { useState } from "react";
import { Form, Loader, Button } from "@ahaui/react";

const CategoryForm = () => {

  const [loading, setLoading] = useState(false)
  return (
    <form className=" u-flex u-flexColumn u-alignItemsCenter">
      <h1 className="u-text700 u-marginBottomSmall">Sign in</h1>
      <Form.Group controlId="email-control">
        <Form.Label>Email</Form.Label>
        <Form.Input
          type="email"
          placeholder="Enter email"
          name="email"
        ></Form.Input>
      </Form.Group>
      <Form.Group controlId="password-control">
        <Form.Label>Password</Form.Label>
        <Form.Input
          
          type="password"
          placeholder="Enter password"
          name="password"
          
        ></Form.Input>
       
      </Form.Group>
      {loading ? (
        <Loader duration={500} />
      ) : (
        <Button variant="primary">
          <Button.Label>Login</Button.Label>
        </Button>
      )}
    </form>
  );
};

export default CategoryForm;
