import React, { Dispatch, SetStateAction } from "react";
import { Modal, Button } from "@ahaui/react";
import classNames from "classnames";
import styles from "./Popup.module.css";
import { useAppSelector } from "hooks";
import { popupSelector } from "store/reducers/popupReducer";

const Popup: React.FC = () => {
  const { popupProps } = useAppSelector(popupSelector);
  const { title, isOpen, children, footer, closeHandler } = popupProps;

  return (
    <div>
      {isOpen && (
        <div
          className={classNames(
            "u-positionAbsolute u-positionTop u-positionBottom u-positionLeft u-positionRight u-flex u-justifyContentCenter u-alignItemsCenter",
            styles.popupOverlay
          )}
        >
          <Modal size="large" relative style={{ zIndex: "999" }}>
            <Modal.Header closeButton onHide={() => closeHandler()}>
              <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="u-textCenter">{children}</div>
            </Modal.Body>
            {footer ? (
              footer
            ) : (
              <Modal.Footer>
                <Button variant="secondary">Cancel</Button>
                <Button variant="primary">Ok, Got It!</Button>
              </Modal.Footer>
            )}
          </Modal>
        </div>
      )}
    </div>
  );
};

export default Popup;
