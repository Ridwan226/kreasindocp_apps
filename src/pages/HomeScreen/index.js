import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
  ImageBackground,
  PermissionsAndroid,
  ScrollView,
  ScrollViewBase,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {Button, Dialog} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {CardUser, Gap, LocationProject} from '../../component';
import {getProfileDataAction} from '../../redux/action/profile';
import {clockInPost, getShiftData} from '../../redux/action/shift';
import {showMessage} from '../../utils';
import moment from 'moment';

const HomeScreen = ({navigation}) => {
  const [location, setLocation] = useState(false);
  const [visibleLogout, setVisibleLogout] = useState(false);
  const [dataShift, setDataShift] = useState({});
  const [dataProfile, setDataProfile] = useState({});
  const hideDialog = () => setVisibleLogout(!visibleLogout);
  const {isLoading, imageSelfie} = useSelector(state => state.globalReducer);
  console.log('isLoading', isLoading);
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      getDataShift();
      getDataProfile();
      getLocation();
    }, []),
  );

  const getDataShift = () => {
    dispatch(getShiftData(setDataShift));
  };

  const getDataProfile = () => {
    dispatch(getProfileDataAction(setDataProfile));
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log('granted', granted);
      if (granted === 'granted') {
        console.log('You can use Geolocation');
        return true;
      } else {
        console.log('You cannot use Geolocation');
        return false;
      }
    } catch (err) {
      return false;
    }
  };

  const getLocation = () => {
    const result = requestLocationPermission();
    result.then(res => {
      console.log('res is:', res);
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            console.log(position);
            setLocation(position);
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
            setLocation(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
    console.log(location);
  };

  const onLogout = async () => {
    setVisibleLogout(!visibleLogout);
    console.log('onLogout');
    const keys = await AsyncStorage.getAllKeys();
    console.log('onLogout', keys);
    AsyncStorage.multiRemove(keys).then(res => {
      dispatch({type: 'DESTROY_SESSION'});
      navigation.replace('SplashScreen');
    });
  };

  const onClockIn = async () => {
    if (!imageSelfie?.uri) {
      showMessage('Silahkan Ambil Foto Terlebih Dahulu');
      return;
    }

    if (!location?.coords?.latitude) {
      showMessage('Silahkan Aktifkan GPS Lokasi Anda');
      return;
    }

    const form = new FormData();
    form.append('file', imageSelfie);
    form.append('latitude', location?.coords?.latitude);
    form.append('longitude', location?.coords?.longitude);
    form.append('clock_state', 'clock_in');
    form.append('type', 'set_clocking');

    try {
      await dispatch(clockInPost(form)); // Sekarang bisa `await`
      console.log('get Data');
      getDataShift();
      getDataProfile();
      getLocation();
    } catch (error) {
      console.log('Clock in failed', error);
    }

    // dispatch(clockInPost(form));
    // setTimeout(() => {
    //   console.log('get Data');
    //   getDataShift();
    //   getDataProfile();
    //   getLocation();
    // }, 3000);
  };

  const onClockOut = async () => {
    if (!location?.coords?.latitude) {
      showMessage('Silahkan Aktifkan GPS Lokasi Anda');
      return;
    }

    const form = new FormData();
    form.append('latitude', location?.coords?.latitude);
    form.append('longitude', location?.coords?.longitude);
    form.append('clock_state', 'clock_out');
    form.append('type', 'set_clocking');
    form.append(
      'time_id',
      dataShift?.attendance_time_checks_value_api?.[0]?.time_attendance_id,
    );

    try {
      await dispatch(clockInPost(form)); // Sekarang bisa `await`
      console.log('get Data');
      getDataShift();
      getDataProfile();
      getLocation();
    } catch (error) {
      console.error('Clock in failed', error);
    }

    // console.log('form', form);
    // dispatch(clockInPost(form));
    // setTimeout(() => {
    //   getDataShift();
    //   getDataProfile();
    //   getLocation();
    // }, 3000);
  };

  return (
    <SafeAreaView style={styles.page}>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <CardUser
          onPressLogout={() => setVisibleLogout(!visibleLogout)}
          name={dataProfile?.first_name}
          username={
            dataShift?.attendance_time_checks >= 1
              ? moment(
                  dataShift?.attendance_time_checks_value_api?.[0]?.clock_in,
                ).format('HH:MM A')
              : dataProfile?.username
          }
          image={dataProfile?.profile_photo}
          timeIn={dataShift?.attendance_time_checks >= 1 ? true : false}
        />
        <View style={styles.container}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View
              style={[
                styles.wpTime,
                {borderBottomWidth: 1, borderColor: '#c9c9c9'},
              ]}>
              <Text style={styles.txTitle}>Jam Kerja</Text>
              <Text style={styles.txDesc}>{dataShift?.shift}</Text>
            </View>
            <View
              style={[
                styles.wpTime,
                {
                  borderBottomWidth: 1,
                  borderLeftWidth: 1,
                  borderColor: '#c9c9c9',
                  paddingHorizontal: 5,
                },
              ]}>
              <Text style={styles.txTitle}>Posisi</Text>
              <Text style={styles.txPosisi}>{dataShift?.idesignations}</Text>
            </View>
          </View>
          {dataShift?.projects?.length > 0 && (
            <>
              <Gap height={10} />
              <LocationProject data={dataShift?.projects} />
            </>
          )}

          <Gap height={10} />
          <View style={styles.wpAbsen}>
            {dataShift?.attendance_time_checks < 1 ? (
              imageSelfie?.uri ? (
                <ImageBackground
                  style={{
                    width: '100%',
                    height: '90%',
                    alignItems: 'center',
                    position: 'relative',
                  }}
                  imageStyle={{
                    borderRadius: 10,
                    objectFit: 'cover',
                  }}
                  source={{uri: imageSelfie?.uri}}>
                  <Button
                    icon="camera"
                    buttonColor="#DD4017"
                    mode="contained"
                    style={{
                      position: 'absolute',
                      bottom: '15%',
                    }}
                    disabled={
                      dataShift?.attendance_time_checks < 1 ? false : true
                    }
                    onPress={() => {
                      navigation.push('TakeSelfieScreen');
                    }}>
                    Ulangi Foto
                  </Button>
                </ImageBackground>
              ) : (
                <View style={styles.wpButtonFoto}>
                  <Button
                    icon="camera"
                    buttonColor="#DD4017"
                    mode="contained"
                    disabled={
                      dataShift?.attendance_time_checks < 1 ? false : true
                    }
                    onPress={() => navigation.push('TakeSelfieScreen')}>
                    Ambil Foto
                  </Button>
                </View>
              )
            ) : null}

            <Gap height={10} />
            <View style={styles.wpButton}>
              <Button
                icon="arrow-right"
                mode="contained"
                disabled={dataShift?.attendance_time_checks < 1 ? false : true}
                buttonColor="#17C666"
                onPress={() => onClockIn()}>
                Jam Masuk
              </Button>
              <Button
                icon="arrow-down"
                mode="contained"
                disabled={dataShift?.attendance_time_checks < 1 ? true : false}
                buttonColor="#6c757d"
                onPress={() => onClockOut()}>
                Jam Keluar
              </Button>
            </View>

            <Button
              icon="arrow-right"
              mode="contained"
              buttonColor="#DD4017"
              style={{marginTop: 20, width: '100%'}}
              onPress={() => navigation.push('MyAttendanceScreen')}>
              Kehadiran Saya
            </Button>
          </View>
        </View>
        <Gap height={500} />
      </ScrollView>
      <Dialog visible={visibleLogout} onDismiss={hideDialog}>
        <Dialog.Icon icon="alert" />
        <Dialog.Title style={styles.title}>Apakah Anda Yakin?</Dialog.Title>
        <Dialog.Actions>
          <Button onPress={() => setVisibleLogout(!visibleLogout)}>
            Cancel
          </Button>
          <Button onPress={onLogout}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  img: {
    width: '80%',
    height: 300,
    objectFit: 'cover',
    borderRadius: 10,
  },
  container: {
    marginVertical: 10,
    marginHorizontal: 15,
    // borderWidth: 1,
    borderColor: '#02275D',
    borderRadius: 10,
    padding: 10,
    flex: 1,
  },

  wpUser: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  wpTime: {
    width: '50%',
    // padding: 10,
  },
  txTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#6c757d',
  },
  txDesc: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#02275D',
  },
  txPosisi: {
    fontSize: 13,
    fontFamily: 'Poppins-SemiBold',
    color: '#02275D',
  },
  wpButtonFoto: {
    width: '100%',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#DD4017',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txName: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#02275D',
  },
  txShift: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#DD4017',
  },
  wpRole: {
    alignItems: 'flex-end',
    width: '30%',
    backgroundColor: '#daf6e7',
    padding: 5,
    borderRadius: 5,
  },
  txRole: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#17C666',
  },
  wpAbsen: {
    alignItems: 'center',
  },
  wpButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  wpIconMenu: {
    marginTop: '5%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  wpIcon: {
    width: '18%',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  txMenu: {
    fontSize: 13,
    color: '#02275D',
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
});
