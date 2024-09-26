import axios from 'axios';
import { store } from '../hooks/store';
import { RsetShowToast } from '../hooks/slices/main';
import { toast } from 'react-toastify';

axios.interceptors.request.use(
  function (config) {
    if (!!localStorage.getItem('tokenId')) {
      config.headers.Authorization = `Bearer ${localStorage.getItem('tokenId')}`;
    }
    if (config.url.includes('AttachmentController/CreateAttachment')) {
      config.headers['Content-Type'] = 'multipart/form-data';
    } else {
      config.headers['Content-Type'] = 'application/json';
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  async function (response) {
    // console.log(response);
    if (
      !!response?.data?.ErrorCode &&
      response?.data?.ErrorCode !== 0 &&
      response?.data?.ErrorCode !== 5 &&
      response?.data?.ErrorCode !== 10 &&
      response?.data?.ErrorCode !== 11
    ) {
      toast.error('مشکلی در سرور به وجود آمده است.');
    }
    return response;
  },
  async function (error) {
    console.log(error.response.status);
    if (error.response.status == 500) {
      toast.error('مشکلی در برقراری ارتباط با سرور پیش امده لطفا دوباره تلاش کنید');
    }
  }
);
