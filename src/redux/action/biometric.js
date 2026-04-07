import Axios from 'axios';
import {API_HOST} from '../../config';
import {getData, showMessage, storeData} from '../../utils';

export const registPublicKeyPos = form => dispatch => {
  return getData('tokenLogin')
    .then(resToken => {
      return Axios.post(`${API_HOST.url_api}/Auth/biometric_create`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: resToken.value,
        },
      });
    })
    .then(res => {
      let result = res.data;
      return result; // Return response agar bisa digunakan
    })
    .catch(err => {
      showMessage(
        err?.response?.data?.message
          ? err?.response?.data?.message
          : 'Something went wrong',
      );
      throw err; // Lempar error agar bisa ditangkap di `onClockIn`
    });
};

export const registVerifyPos = form => dispatch => {
  return getData('tokenLogin')
    .then(resToken => {
      return Axios.post(`${API_HOST.url_api}/Auth/biometric_verify`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: resToken.value,
        },
      });
    })
    .then(res => {
      let result = res.data;
      return result; // Return response agar bisa digunakan
    })
    .catch(err => {
      showMessage(
        err?.response?.data?.message
          ? err?.response?.data?.message
          : 'Something went wrong',
      );
      throw err; // Lempar error agar bisa ditangkap di `onClockIn`
    });
};
