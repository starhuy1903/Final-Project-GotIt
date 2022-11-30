import classNames from "classnames";
import React from "react";
import { Modal } from "@ahaui/react";
import { PopupProps } from ".";
import styles from "./Popup.module.css";

const FormPopup: React.FC<PopupProps> = ({
  title,
  isOpen,
  children,
  closeHandler,
}) => {
  return (
    <div>
      {isOpen && (
        <div
          className={classNames(
            "u-positionFixed u-widthFull u-heightFull u-positionTop u-positionBottom u-positionLeft u-positionRight u-flex u-justifyContentCenter u-alignItemsCenter",
            styles.popupOverlay,
            styles.popupWrapper
          )}
        >
          <Modal size="large" relative style={{ zIndex: "999" }}>
            <Modal.Header closeButton onHide={() => closeHandler()}>
              <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{children}</Modal.Body>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default FormPopup;
