import { Button } from '@ahaui/react';
import React from 'react';
import PopupWrapper from './PopupWrapper';

export type NotificationMessageProps = {
  title: string,
  onSubmit: () => void;
  closeHandler: () => void;
}

const NotificationMessage :React.FC<NotificationMessageProps> = ({
  title,
  closeHandler,
  onSubmit
}) => (
  <PopupWrapper title={title} closeHandler={closeHandler}>
    <div className="u-flex u-flexColumn u-alignItemsCenter u-widthFull">
      <p>
        You do not have permission to do this action!
      </p>
      <div className="u-flex u-alignItemsCenter u-justifyContentCenter u-widthFull">
        <Button variant="primary" onClick={onSubmit}>
          <Button.Label>OK</Button.Label>
        </Button>
      </div>
    </div>
  </PopupWrapper>
);

export default NotificationMessage;
