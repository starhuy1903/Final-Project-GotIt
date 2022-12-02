import React, { useState } from "react";
import { Form, Loader, Button } from "@ahaui/react";
import { useFormik } from "formik";
import * as yup from "yup";
import { CategoryPayload } from "types/category";
import PopupWrapper from "./PopupWrapper";

export type CategoryFormProps = {
  item?: CategoryPayload;
  title: string;
  onSubmit: (...params: any[]) => void;
  closeHandler: () => void;
};

const schema = yup.object().shape({
  name: yup.string().required("No name provided."),
  description: yup.string().required("No password provided."),
  imageUrl: yup.string().required("No image url provided."),
});

const initialValues: CategoryPayload = {
  name: "",
  description: "",
  imageUrl: "",
};

const CategoryForm: React.FC<CategoryFormProps> = ({item, title, onSubmit, closeHandler }) => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: item ? item : initialValues,
    onSubmit: (category) => {
      handleSubmit(category);
    },

    validationSchema: schema,
    validateOnChange: false,
    validateOnBlur: true,
  });

  const handleSubmit = async (category: CategoryPayload) => {
    try {
      setLoading(true);
      await onSubmit(category);
      setLoading(false);
      formik.resetForm({ values: initialValues });
    } catch (err: any) {
      setLoading(false);
      formik.resetForm({ values: formik.values });
    }
  };

  return (
    <PopupWrapper title={title} closeHandler={closeHandler}  >
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
          <Button
            type="button"
            onClick={() => formik.resetForm({ values: initialValues })}
            variant="secondary"
          >
            <Button.Label>Reset</Button.Label>
          </Button>
          <Button variant="primary">
            <Button.Label>Submit</Button.Label>
          </Button>
        </div>
      )}
    </form>
    </PopupWrapper>
  );
};

export default CategoryForm;
