import Axios from 'axios';
import {API_HOST} from '../../config';
import {getData, showMessage, storeData} from '../../utils';

export const getShiftData = setDataShift => dispatch => {
  getData('tokenLogin')
    .then(resToken => {
      Axios.get(`${API_HOST.url_api}/Shifts/get_shift`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: resToken.value,
        },
      })
        .then(res => {
          let result = res.data;
          console.log('res shift', result);
          setDataShift(result?.message);
        })
        .catch(err => {
          console.log('err shift', err);
        });
    })
    .catch(err => {
      console.log('err shift', err);
    });
};

export const clockInPost = form => dispatch => {
  dispatch({type: 'SET_LOADING', value: true});

  getData('tokenLogin')
    .then(resToken => {
      Axios.post(`${API_HOST.url_api}/Shifts/set_clocking`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: resToken.value,
        },
      })
        .then(res => {
          let result = res.data;
          dispatch({type: 'SET_IMAGE_SELFIE', value: {}});
          console.log('res shift', result);
          showMessage('Save Data Success', 'success');
          dispatch({type: 'SET_LOADING', value: false});
        })
        .catch(err => {
          console.log('err', err);
          showMessage(
            err?.response?.data?.message
              ? err?.response?.data?.message
              : 'Something went wrong',
          );
          dispatch({type: 'SET_LOADING', value: false});
        });
    })
    .catch(err => {
      dispatch({type: 'SET_LOADING', value: false});
      console.log('err shift', err);
    });
};
