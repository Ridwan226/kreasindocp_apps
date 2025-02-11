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

// export const clockInPost = form => dispatch => {
//   dispatch({type: 'SET_LOADING', value: true});

//   getData('tokenLogin')
//     .then(resToken => {
//       Axios.post(`${API_HOST.url_api}/Shifts/set_clocking`, form, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           authorization: resToken.value,
//         },
//       })
//         .then(res => {
//           let result = res.data;
//           dispatch({type: 'SET_IMAGE_SELFIE', value: {}});
//           console.log('res shift', result);
//           showMessage('Save Data Success', 'success');
//           dispatch({type: 'SET_LOADING', value: false});
//         })
//         .catch(err => {
//           console.log('err', err);
//           showMessage(
//             err?.response?.data?.message
//               ? err?.response?.data?.message
//               : 'Something went wrong',
//           );
//           dispatch({type: 'SET_LOADING', value: false});
//         });
//     })
//     .catch(err => {
//       dispatch({type: 'SET_LOADING', value: false});
//       console.log('err shift', err);
//     });
// };

export const clockInPost = form => dispatch => {
  dispatch({type: 'SET_LOADING', value: true});

  return getData('tokenLogin') // Tambahkan return
    .then(resToken => {
      return Axios.post(`${API_HOST.url_api}/Shifts/set_clocking`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: resToken.value,
        },
      });
    })
    .then(res => {
      let result = res.data;
      dispatch({type: 'SET_IMAGE_SELFIE', value: {}});
      console.log('res shift', result);
      showMessage('Save Data Success', 'success');
      dispatch({type: 'SET_LOADING', value: false});
      return result; // Return response agar bisa digunakan
    })
    .catch(err => {
      console.log('err', err);
      showMessage(
        err?.response?.data?.message
          ? err?.response?.data?.message
          : 'Something went wrong',
      );
      dispatch({type: 'SET_LOADING', value: false});
      throw err; // Lempar error agar bisa ditangkap di `onClockIn`
    });
};

export const viewDataMyAttendance = (form, setDateList) => dispatch => {
  getData('tokenLogin')
    .then(resToken => {
      Axios.post(`${API_HOST.url_api}/Shifts/monthly_attendance_view`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: resToken.value,
        },
      })
        .then(res => {
          let result = res.data;
          setDateList(result?.message);
        })
        .catch(err => {
          console.log('err', err);
          showMessage(
            err?.response?.data?.message
              ? err?.response?.data?.message
              : 'Something went wrong',
          );
        });
    })
    .catch(err => {
      console.log('err shift', err);
    });
};

export const viewDataMyAttendanceDetail = (form, setData) => dispatch => {
  getData('tokenLogin')
    .then(resToken => {
      Axios.post(`${API_HOST.url_api}/Shifts/attendance_info`, form, {
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
          console.log('err', err);
          showMessage(
            err?.response?.data?.message
              ? err?.response?.data?.message
              : 'Something went wrong',
          );
        });
    })
    .catch(err => {
      console.log('err shift', err);
    });
};
