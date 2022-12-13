import axios, { AxiosResponse } from 'axios';
import { Dispatch } from 'redux';
import { convertSnakeCaseToCamelCase } from 'utils/convertObject';
import { NotiMsgType } from '../store/actions/notiMsg';
import { TOKEN_KEY } from '../constants';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});

export const apiWrapper = (axiosRequest: Promise<AxiosResponse<any, any>>) => async (dispatch: Dispatch) => {
  try {
    const result = await axiosRequest;
    return {
      success: true,
      data: convertSnakeCaseToCamelCase(result)
    };
  } catch (err: any) {
    const { status, data } = err.response;
    const { message: errMessage, data: errData } = data;
    dispatch({
      type: NotiMsgType.SET_MSG,
      payload: {
        error: { message: errMessage, data: errData },
        status,
      },
    });
    return {
      success: false,
      data: null
    };
  }
};

export default api;
