import {
  Image,
  PermissionsAndroid,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CardUser, Gap} from '../../component';
import {Button, Dialog} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {showMessage} from '../../utils';
import Geolocation from 'react-native-geolocation-service';
import {clockInPost, getShiftData} from '../../redux/action/shift';
import {getProfileDataAction} from '../../redux/action/profile';
import Feather from 'react-native-vector-icons/Feather';

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
      console.log('imageSelfie', imageSelfie);
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
      navigation.replace('SplashScreen');
    });
  };

  const onClockIn = () => {
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

    console.log('form', form);
    dispatch(clockInPost(form));
    setTimeout(() => {
      getDataShift();
      getDataProfile();
      getLocation();
    }, 2000);
  };

  const onClockOut = () => {
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

    console.log('form', form);
    dispatch(clockInPost(form));
    setTimeout(() => {
      getDataShift();
      getDataProfile();
      getLocation();
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.page}>
      <ScrollView>
        <CardUser
          onPressLogout={() => setVisibleLogout(!visibleLogout)}
          name={dataProfile?.first_name}
          username={dataProfile?.username}
          image={dataProfile?.profile_photo}
        />
        <View style={styles.container}>
          <View style={styles.wpUser}>
            <View style={{width: '70%'}}>
              <Text style={styles.txName}>
                Welcome IT {dataProfile?.first_name} {dataProfile?.last_name}
              </Text>
              <Text style={styles.txShift}>{dataShift?.shift}</Text>
            </View>
            <View style={styles.wpRole}>
              <Text style={styles.txRole}>{dataShift?.idesignations}</Text>
            </View>
          </View>
          <Gap height={20} />
          <View style={styles.wpAbsen}>
            {dataShift?.attendance_time_checks < 1 ? (
              <>
                {imageSelfie?.uri ? (
                  <Image
                    source={{
                      uri: imageSelfie?.uri,
                    }}
                    style={styles.img}
                  />
                ) : null}

                <Gap height={20} />
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
              </>
            ) : (
              <View
                style={{
                  alignItems: 'flex-start',
                  width: '100%',
                }}>
                <Text>
                  Anda sudah Clock in di Lokasi :{' '}
                  {
                    dataShift?.attendance_time_checks_value_api?.[0]
                      ?.project_name
                  }
                </Text>
              </View>
            )}

            <Gap height={20} />

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

        <View style={styles.wpIconMenu}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.wpIcon}
            onPress={() => navigation.push('TaskScreen')}>
            <Feather name="check-square" size={30} color={'#DD4017'} />
            <Text style={styles.txMenu}>{'Tasks'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.wpIcon}
            onPress={() => navigation.push('ProjectScreen')}>
            <Feather name="briefcase" size={30} color={'#DD4017'} />
            <Text style={styles.txMenu}>Projects</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.wpIcon}
            onPress={() => navigation.push('RequestMenuScreen')}>
            <Feather name="git-pull-request" size={30} color={'#DD4017'} />
            <Text style={styles.txMenu}>Request</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.wpIcon}
            onPress={() => navigation.push('ClientScreen')}>
            <Feather name="users" size={30} color={'#DD4017'} />
            <Text style={styles.txMenu}>Manage Client</Text>
          </TouchableOpacity>
        </View>
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
    margin: 15,
    borderWidth: 1,
    borderColor: '#02275D',
    borderRadius: 10,
    padding: 10,
  },

  wpUser: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
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
