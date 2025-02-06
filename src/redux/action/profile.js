import Axios from 'axios';
import {API_HOST} from '../../config';
import {getData, showMessage, storeData} from '../../utils';

export const getProfileDataAction = setDataProfile => dispatch => {
  getData('tokenLogin')
    .then(resToken => {
      Axios.get(`${API_HOST.url_api}/Auth/profile`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: resToken.value,
        },
      })
        .then(res => {
          let result = res.data;
          console.log('res shift', result);
          setDataProfile(result?.message);
        })
        .catch(err => {
          console.log('err shift', err);
        });
    })
    .catch(err => {
      console.log('err shift', err);
    });
};
