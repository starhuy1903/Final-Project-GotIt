import { Button } from '@ahaui/react';
import React from 'react';
import { PopupPropsType } from 'store/reducers/popupReducer';
import PopupWrapper from './PopupWrapper';

const LoginConfirm :React.FC<PopupPropsType> = ({
  title, onSubmit, closeHandler,
}) => (
  <PopupWrapper title={title} closeHandler={closeHandler}>
    <div className="u-flex u-flexColumn u-alignItemsCenter u-widthFull">
      <p>
        You need to login to perform this action!
      </p>
      <div className="u-flex u-alignItemsCenter u-justifyContentBetween u-widthFull">
        <Button variant="secondary" onClick={closeHandler}>
          <Button.Label>Cancel</Button.Label>
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          <Button.Label>Login</Button.Label>
        </Button>
      </div>
    </div>
  </PopupWrapper>
);

export default LoginConfirm;
