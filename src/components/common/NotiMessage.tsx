import React, { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { selectNotiMsg } from 'store/reducers/notiMsgReducer';
import useAppSelector from 'hooks/useAppSelector';
import useTypedDispatch from 'hooks/useTypedDispatch';
import { clearNotiMsg } from 'store/actions/notiMsgActions';

const NotiMessage: React.FC = () => {
  const notiMsg = useAppSelector(selectNotiMsg);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    const { msg, status, error } = notiMsg;

    if (!(msg || status || error)) return;
    toast.dismiss();
    // Response Error Message
    if (status && error) {
      if (!error.data) {
        toast.error(`${status}: ${error.message}`);
      } else {
        for (const keys in error.data) {
          toast.error(`${status}: ${error.data[keys][0]}`);
        }
      }
    } else if (!status && error) {
      toast.error(error.message);
    } else if (msg) toast(`${status}: ${msg}`);

    dispatch(clearNotiMsg());
  }, [notiMsg]);

  return <ToastContainer />;
};

export default NotiMessage;
