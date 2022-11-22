import React, { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { useAppSelector } from "../../hooks";
import { selectNotiMsg } from "store/reducers/notiMsgReducer";

const NotiMessage: React.FC = () => {
  const notiMsg = useAppSelector(selectNotiMsg);

  useEffect(() => {
    const { msg, status, error } = notiMsg;

    // Response Error Message
    if (status && error) {
      if (!error.data) {
        toast.error(`${status}: ${error.message}`);
      } else {
        for (const keys in error.data) {
          toast.error(`${status}: ${error.data[keys][0]}`);
        }
      }
      return;
    }

    // If fetch error
    if (!status && error) {
      toast.error(error.message);
      return;
    }

    if (msg) toast(msg);
  }, [notiMsg]);

  return <ToastContainer />;
};

export default NotiMessage;
