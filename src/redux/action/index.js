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
      let result = res.data;
      const token = `Bearer ${result.token}`;
      storeData('userProfile', result.message);
      storeData('tokenLogin', {value: token});
      dispatch({type: 'SET_LOADING', value: false});
      showMessage('Login Success', 'success');
      navigation.reset({index: 0, routes: [{name: 'MainApp'}]});
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
};
