import Axios from 'axios';
import {API_HOST, GLOBAL_DATA} from '../../config';
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
          setDataProfile(result?.message);
        })
        .catch(err => {});
    })
    .catch(err => {});
};

export const getVersionApps = getDataAppsVersion => dispatch => {
  getData('tokenLogin')
    .then(resToken => {
      Axios.get(`${API_HOST.url_api}/Auth/apps_version`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: resToken.value,
        },
      })
        .then(res => {
          let result = res?.data?.message;
          console.log('result', result);
          if (result == GLOBAL_DATA.versionApps) {
            getDataAppsVersion(false);
          } else {
            getDataAppsVersion(true);
          }
        })
        .catch(err => {});
    })
    .catch(err => {});
};
