import React, { Dispatch, SetStateAction } from "react";
import { Modal, Button } from "@ahaui/react";
import classNames from "classnames";
import styles from "./Popup.module.css";

interface PopupProps {
  title?: string;
  children?: React.ReactNode;
  openPopup: boolean;
  setOpenPopup: Dispatch<SetStateAction<boolean>>;
}

const Popup: React.FC<PopupProps> = (props) => {
  const { title, children, openPopup, setOpenPopup } = props;
  return (
    <div
      className={classNames(
        "u-positionAbsolute u-positionTop u-positionBottom u-positionLeft u-positionRight u-flex u-justifyContentCenter u-alignItemsCenter",
        styles.modalOverlay
      )}
    >
      <Modal size="large" relative style={{ zIndex: "999" }} show={openPopup}>
        <Modal.Header closeButton onHide={() => setOpenPopup(false)}>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="u-textCenter">
            <img
              src="holder.js/100px218?text=Image"
              className="u-maxWidthFull u-marginBottomExtraSmall"
              alt=""
            />
          </div>
          <p>Modal body text goes here.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpenPopup(false)} variant="secondary">
            Cancel
          </Button>
          <Button variant="primary">Ok, Got It!</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Popup;
