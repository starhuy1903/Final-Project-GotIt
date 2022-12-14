import classNames from 'classnames';
import React from 'react';
import { Modal } from '@ahaui/react';
import styles from './Popup.module.css';

type PopupWrapperProps = {
  title: string;
  children: React.ReactNode;
  closeHandler: (() => void) | null;
};

const PopupWrapper: React.FC<PopupWrapperProps> = ({
  title,
  children,
  closeHandler,
}) => (
  <div
    className={classNames(
      'u-positionFixed u-widthFull u-heightFull u-positionTop u-positionBottom u-positionLeft u-positionRight u-flex u-justifyContentCenter u-alignItemsCenter',
      styles.popupOverlay,
      styles.popupWrapper,
    )}
  >
    <Modal size="extraLarge" relative style={{ zIndex: '999', minWidth: '500px' }}>
      <Modal.Header closeButton onHide={() => closeHandler?.()}>
        <Modal.Title className="u-fontMedium u-text800">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  </div>
);

export default PopupWrapper;
