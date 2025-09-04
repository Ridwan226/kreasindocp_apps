import Axios from 'axios';
import {API_HOST} from '../../config';
import {showMessage, storeData} from '../../utils';

export const signInAccton = (form, navigation) => dispatch => {
  Axios.post(`${API_HOST.url_api}/Auth/login`, form, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then(res => {
      // let dataLogin = {
      //   status: 'error',
      //   message: {
      //     id: '123',
      //     username: 'Yudikcp',
      //     email: 'ambar123@gmail.com',
      //     role: '22',
      //   },
      //   token:
      //     'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEyMyIsInVzZXJuYW1lIjoiWXVkaWtjcCIsImVtYWlsIjoiYW1iYXIxMjNAZ21haWwuY29tIiwicm9sZSI6IjIyIn0.jqSFvO1ulESXDDbRWRARkMr4Ihjf_s9ZTupPysb1yE4',
      //   date: '2025-08-07 22:29:57',
      // };

      let result = res.data;
      const token = `Bearer ${result.token}`;
      storeData('userProfile', result.message);
      storeData('tokenLogin', {value: token});
      dispatch({type: 'SET_LOADING', value: false});
      showMessage('Login Success', 'success');
      navigation.replace('Home');
    })
    .catch(err => {
      showMessage(
        err?.response?.data?.message
          ? err?.response?.data?.message
          : 'Something went wrong',
      );
      dispatch({type: 'SET_LOADING', value: false});
    });
};

export const ForgotPasswordAccton = form => dispatch => {
  Axios.post(`${API_HOST.url_api}/Auth/forgot_password`, form, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then(res => {
      showMessage('Success Send Email, Please Check Your Email', 'success');
      dispatch({type: 'SET_LOADING', value: false});
    })
    .catch(err => {
      showMessage(
        err?.response?.data?.message
          ? err?.response?.data?.message
          : 'Something went wrong',
      );
      dispatch({type: 'SET_LOADING', value: false});
    });
};
