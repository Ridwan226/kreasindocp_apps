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

// export const updateCeklistTask = (form, setData) => dispatch => {
//   getData('tokenLogin')
//     .then(resToken => {
//       Axios.post(`${API_HOST.url_api}/Task/list_task_detail`, form, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           authorization: resToken.value,
//         },
//       })
//         .then(res => {
//           let result = res.data;
//           setData(result?.message);
//         })
//         .catch(err => {
//           showMessage(
//             err?.response?.data?.message
//               ? err?.response?.data?.message
//               : 'Something went wrong',
//           );
//         });
//     })
//     .catch(err => {});
// };

export const updateCeklistTask = form => dispatch => {
  // dispatch({type: 'SET_LOADING', value: true});

  return getData('tokenLogin') // Tambahkan return
    .then(resToken => {
      return Axios.post(
        `${API_HOST.url_api}/Task/update_ceklist_subtask`,
        form,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            authorization: resToken.value,
          },
        },
      );
    })
    .then(res => {
      let result = res.data;
      // dispatch({type: 'SET_IMAGE_SELFIE', value: {}});
      // console.log('res shift', result);
      // showMessage('Save Data Success', 'success');
      // dispatch({type: 'SET_LOADING', value: false});
      return result; // Return response agar bisa digunakan
    })
    .catch(err => {
      showMessage(
        err?.response?.data?.message
          ? err?.response?.data?.message
          : 'Something went wrong',
      );
      // dispatch({type: 'SET_LOADING', value: false});
      throw err; // Lempar error agar bisa ditangkap di `onClockIn`
    });
};

export const addSubTask = form => dispatch => {
  dispatch({type: 'SET_LOADING', value: true});

  return getData('tokenLogin') // Tambahkan return
    .then(resToken => {
      return Axios.post(`${API_HOST.url_api}/Task/add_subtask`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: resToken.value,
        },
      });
    })
    .then(res => {
      let result = res.data;
      showMessage('Save Data Success', 'success');
      dispatch({type: 'SET_LOADING', value: false});
      return result; // Return response agar bisa digunakan
    })
    .catch(err => {
      showMessage(
        err?.response?.data?.message
          ? err?.response?.data?.message
          : 'Something went wrong',
      );
      dispatch({type: 'SET_LOADING', value: false});
      throw err;
    });
};
