import Axios from 'axios';
import {API_HOST} from '../../config';
import {getData, showMessage, storeData} from '../../utils';

export const gettaskData = (form, setData) => dispatch => {
  getData('tokenLogin')
    .then(resToken => {
      Axios.post(`${API_HOST.url_api}/Task/list_task`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: resToken.value,
        },
      })
        .then(res => {
          let result = res.data;
          setData(result?.message);
        })
        .catch(err => {
          showMessage(
            err?.response?.data?.message
              ? err?.response?.data?.message
              : 'Something went wrong',
          );
        });
    })
    .catch(err => {});
};

export const gettaskDataDetail = (form, setData) => dispatch => {
  getData('tokenLogin')
    .then(resToken => {
      Axios.post(`${API_HOST.url_api}/Task/list_task_detail`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: resToken.value,
        },
      })
        .then(res => {
          let result = res.data;
          setData(result?.message);
        })
        .catch(err => {
          showMessage(
            err?.response?.data?.message
              ? err?.response?.data?.message
              : 'Something went wrong',
          );
        });
    })
    .catch(err => {});
};

export const updateCeklistTask = (form, setData) => dispatch => {
  getData('tokenLogin')
    .then(resToken => {
      Axios.post(`${API_HOST.url_api}/Task/list_task_detail`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: resToken.value,
        },
      })
        .then(res => {
          let result = res.data;
          setData(result?.message);
        })
        .catch(err => {
          showMessage(
            err?.response?.data?.message
              ? err?.response?.data?.message
              : 'Something went wrong',
          );
        });
    })
    .catch(err => {});
};
