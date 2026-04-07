import Axios from 'axios';
import {API_HOST, GLOBAL_DATA} from '../../config';
import {getData, showMessage, storeData} from '../../utils';
import {Platform} from 'react-native';

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
      Axios.get(`${API_HOST.url_api}/Auth/apps_version_v2`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: resToken.value,
        },
      })
        .then(res => {
          let result = res?.data?.message;
          if (Platform.OS === 'android') {
            if (result?.force_update_android == true) {
              if (result?.version_android == GLOBAL_DATA.versionAppsAndroid) {
                getDataAppsVersion(false);
              } else {
                getDataAppsVersion(true);
              }
            }
          } else {
            if (result?.force_update_ios == true) {
              if (result?.version_ios == GLOBAL_DATA.versionAppsIOS) {
                getDataAppsVersion(false);
              } else {
                getDataAppsVersion(true);
              }
            }
          }

          dispatch({type: 'SET_IS_CONNECTED', value: false});
        })
        .catch(err => {
          dispatch({type: 'SET_IS_CONNECTED', value: true});
        });
    })
    .catch(err => {
      dispatch({type: 'SET_IS_CONNECTED', value: true});
    });
};
