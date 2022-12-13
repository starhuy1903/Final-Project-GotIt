import React, { useState } from 'react';
import { Form, Loader, Button } from '@ahaui/react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { ItemPayload } from 'types/item';
import { PopupPropsType } from 'store/reducers/popupReducer';
import PopupWrapper from './PopupWrapper';

const schema = yup.object().shape({
  description: yup.string().required('No password provided.'),
  imageUrl: yup.string().required('No image url provided.'),
});

const initialValues: ItemPayload = {
  description: '',
  imageUrl: '',
};

const ItemForm: React.FC<PopupPropsType> = ({
  item, title, onSubmit, closeHandler,
}) => {
  const [loading, setLoading] = useState(false);

  const itemForm = item ? { description: item.description, imageUrl: item.imageUrl } : null;

  const formik = useFormik({
    initialValues: itemForm || initialValues,
    onSubmit: (submittedItem) => {
      handleSubmit(submittedItem);
    },

    validationSchema: schema,
    validateOnChange: false,
    validateOnBlur: true,
  });

  const handleSubmit = async (submittedItem: ItemPayload) => {
    setLoading(true);
    const hasSucceeded = await onSubmit?.(submittedItem);
    if (!hasSucceeded) {
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
        {loading ? (
          <Loader duration={500} />
        ) : (
          <div className="u-flex u-alignItemsCenter u-justifyContentEnd u-widthFull">
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
          </div>
        )}
      </form>
    </PopupWrapper>
  );
};

export default ItemForm;
