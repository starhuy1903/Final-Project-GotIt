import { Button } from '@ahaui/react';
import React from 'react';
import PopupWrapper from './PopupWrapper';

export type DeleteConfirmProps = {
    item?: any;
  title: string;
  onSubmit: (...params: any[]) => void;
  closeHandler: () => void;
}

const DeleteConfirm :React.FC<DeleteConfirmProps> = ({
  item, title, onSubmit, closeHandler,
}) => (
  <PopupWrapper title={title} closeHandler={closeHandler}>
    <div className="u-flex u-flexColumn u-alignItemsCenter u-widthFull">
      <p>
        Are you sure to delete
        <span className="u-fontBold">{item.name}</span>
        {' '}
        ?
      </p>
      <div className="u-flex u-alignItemsCenter u-justifyContentBetween u-widthFull">
        <Button variant="secondary" onClick={closeHandler}>
          <Button.Label>Cancel</Button.Label>
        </Button>
        <Button variant="primary" onClick={() => onSubmit(item.id)}>
          <Button.Label>Delete</Button.Label>
        </Button>
      </div>
    </div>
  </PopupWrapper>
);

export default DeleteConfirm;
