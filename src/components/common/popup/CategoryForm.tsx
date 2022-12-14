import React, { useState } from 'react';
import { Form, Loader, Button } from '@ahaui/react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { CategoryPayload } from 'types/category';
import { PopupPropsType } from 'store/reducers/popupReducer';
import PopupWrapper from './PopupWrapper';

const schema = yup.object().shape({
  name: yup.string().required('No name provided.'),
  description: yup.string().required('No password provided.'),
  imageUrl: yup.string().required('No image url provided.'),
});

const initialValues: CategoryPayload = {
  name: '',
  description: '',
  imageUrl: '',
};

const CategoryForm: React.FC<PopupPropsType> = ({
  item, title, onSubmit, closeHandler,
}) => {
  const [loading, setLoading] = useState(false);

  const categoryForm = item ? {
    name: item.name,
    description: item.description,
    imageUrl: item.imageUrl
  } : null;

  const formik = useFormik({
    initialValues: categoryForm || initialValues,
    onSubmit: (submittedCategory) => {
      handleSubmit(submittedCategory);
    },

    validationSchema: schema,
    validateOnChange: false,
    validateOnBlur: true,
  });

  const handleSubmit = async (submittedCategory: CategoryPayload) => {
    setLoading(true);
    const hasSuccess = await onSubmit?.(submittedCategory);
    if (!hasSuccess) {
      setLoading(false);
      formik.resetForm({ values: initialValues });
    }
  };

  return (
    <PopupWrapper title={title} closeHandler={() => closeHandler?.()}>
      <form
        onSubmit={formik.handleSubmit}
        className=" u-flex u-flexColumn u-alignItemsStart u-widthFull"
      >
        <Form.Group controlId="name-control" className="u-widthFull">
          <Form.Label>Name</Form.Label>
          <Form.Input
            isInvalid={Boolean(formik.touched.name && formik.errors.name)}
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && (
          <Form.Feedback type="invalid">{formik.errors.name}</Form.Feedback>
          )}
        </Form.Group>
        <Form.Group controlId="desc-control" className="u-widthFull">
          <Form.Label>Description</Form.Label>
          <Form.Input
            isInvalid={Boolean(
              formik.touched.description && formik.errors.description,
            )}
            name="description"
            value={formik.values.description}
            as="textarea"
            rows={3}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.description && formik.errors.description && (
          <Form.Feedback type="invalid">
            {formik.errors.description}
          </Form.Feedback>
          )}
        </Form.Group>
        <Form.Group controlId="img-control" className="u-widthFull">
          <Form.Label>Image URL</Form.Label>
          <Form.Input
            isInvalid={Boolean(formik.touched.imageUrl && formik.errors.imageUrl)}
            name="imageUrl"
            value={formik.values.imageUrl}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.imageUrl && formik.errors.imageUrl && (
          <Form.Feedback type="invalid">{formik.errors.imageUrl}</Form.Feedback>
          )}
        </Form.Group>
        <div className="u-flex u-alignItemsCenter u-justifyContentEnd u-widthFull">
          {loading ? <Loader duration={500} /> : (
            <>
              <Button
                type="button"
                onClick={() => formik.resetForm({ values: initialValues })}
                variant="secondary"
                className="u-marginRightSmall"
              >
                <Button.Label className="u-paddingTiny">Reset</Button.Label>
              </Button>
              <Button variant="primary">
                <Button.Label className="u-paddingVerticalTiny u-paddingHorizontalExtraSmall">Submit</Button.Label>
              </Button>
            </>
          )}
        </div>
      </form>
    </PopupWrapper>
  );
};

export default CategoryForm;
