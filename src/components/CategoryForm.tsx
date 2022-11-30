import React, { useState } from "react";
import { Form, Loader, Button } from "@ahaui/react";
import { useFormik } from "formik";
import * as yup from "yup";
import { CategorySubmit } from "types/category";

type CategoryFormProps = {
  onSubmit: () => void;
  onCancel: () => void;
};

const schema = yup.object().shape({
  name: yup.string().required("No name provided."),
  description: yup.string().required("No password provided."),
  imageUrl: yup.string().required("No image url provided."),
});

const initialValues = {
  name: "",
  description: "",
  imageUrl: "",
};

const CategoryForm: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues,
    onSubmit: (category) => {
      handleSubmit(category);
    },

    validationSchema: schema,
    validateOnChange: false,
    validateOnBlur: true,
  });

  const handleSubmit = (category: CategorySubmit) => {
    console.log(category);
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className=" u-flex u-flexColumn u-alignItemsStart u-widthFull"
    >
      <Form.Group controlId="name-control">
        <Form.Label>Name</Form.Label>
        <Form.Input
          isInvalid={Boolean(formik.touched.name && formik.errors.name)}
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        ></Form.Input>
        {formik.touched.name && formik.errors.name && (
          <Form.Feedback type="invalid">{formik.errors.name}</Form.Feedback>
        )}
      </Form.Group>
      <Form.Group controlId="desc-control" className="u-widthFull">
        <Form.Label>Description</Form.Label>
        <Form.Input
          isInvalid={Boolean(
            formik.touched.description && formik.errors.description
          )}
          name="description"
          value={formik.values.description}
          as="textarea"
          rows={3}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        ></Form.Input>
        {formik.touched.description && formik.errors.description && (
          <Form.Feedback type="invalid">
            {formik.errors.description}
          </Form.Feedback>
        )}
      </Form.Group>
      <Form.Group controlId="img-control">
        <Form.Label>Image URL</Form.Label>
        <Form.Input
          isInvalid={Boolean(formik.touched.imageUrl && formik.errors.imageUrl)}
          name="imageUrl"
          value={formik.values.imageUrl}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        ></Form.Input>
        {formik.touched.imageUrl && formik.errors.imageUrl && (
          <Form.Feedback type="invalid">{formik.errors.imageUrl}</Form.Feedback>
        )}
      </Form.Group>
      {loading ? (
        <Loader duration={500} />
      ) : (
        <div className="u-flex u-alignItemsCenter u-justifyContentBetween u-widthFull">
          <Button onClick={formik.handleReset} variant="secondary">
            <Button.Label>Reset</Button.Label>
          </Button>
          <Button variant="primary">
            <Button.Label>Submit</Button.Label>
          </Button>
        </div>
      )}
    </form>
  );
};

export default CategoryForm;
