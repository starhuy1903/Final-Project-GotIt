import { Button } from '@ahaui/react';
import React from 'react';
import { PopupPropsType } from 'store/reducers/popupReducer';
import PopupWrapper from './PopupWrapper';

const DeleteConfirm :React.FC<PopupPropsType> = ({
  item, title, onSubmit, closeHandler,
}) => (
  <PopupWrapper title={title} closeHandler={() => closeHandler?.()}>
    <div className="u-flex u-flexColumn u-alignItemsCenter u-widthFull">
      <p>
        Are you sure to delete?
      </p>
      <div className="u-flex u-alignItemsCenter u-justifyContentCenter u-widthFull">
        <Button variant="secondary" onClick={() => closeHandler?.()} className="u-marginRightSmall">
          <Button.Label className="u-paddingHorizontalMedium">Cancel</Button.Label>
        </Button>
        <Button variant="negative" onClick={() => onSubmit?.(item?.id)}>
          <Button.Label className="u-paddingHorizontalLarge">Delete</Button.Label>
        </Button>
      </div>
    </div>
  </PopupWrapper>
);

export default DeleteConfirm;
