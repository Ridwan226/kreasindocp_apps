import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CardUser, Gap} from '../../component';
import {Button, Dialog} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {showMessage} from '../../utils';

const HomeScreen = ({navigation}) => {
  const [visibleLogout, setVisibleLogout] = useState(false);
  const hideDialog = () => setVisibleLogout(!visibleLogout);
  const {isLoading, imageSelfie} = useSelector(state => state.globalReducer);
  console.log('isLoading', isLoading);
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      console.log('imageSelfie', imageSelfie);
    }, []),
  );

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

    dispatch({type: 'SET_IMAGE_SELFIE', value: {}});
  };

  const onClockOut = () => {};

  return (
    <SafeAreaView style={styles.page}>
      <ScrollView>
        <CardUser onPressLogout={() => setVisibleLogout(!visibleLogout)} />
        <View style={styles.container}>
          <View style={styles.wpUser}>
            <View style={{width: '70%'}}>
              <Text style={styles.txName}>Welcome IT Spv Korpie</Text>
              <Text style={styles.txShift}>My Shift: 10:00 am To 06:00 pm</Text>
            </View>
            <View style={styles.wpRole}>
              <Text style={styles.txRole}>Database Administrator (DBA)</Text>
            </View>
          </View>
          <Gap height={20} />
          <View style={styles.wpAbsen}>
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
              onPress={() => navigation.push('TakeSelfieScreen')}>
              Ambil Foto
            </Button>
            <Gap height={20} />

            <View style={styles.wpButton}>
              <Button
                icon="arrow-right"
                mode="contained"
                buttonColor="#17C666"
                onPress={() => onClockIn()}>
                Jam Masuk
              </Button>
              <Button
                icon="arrow-down"
                mode="contained"
                buttonColor="#6c757d"
                onPress={() => console.log('Pressed')}>
                Jam Keluar
              </Button>
            </View>

            <Button
              icon="arrow-right"
              mode="contained"
              buttonColor="#DD4017"
              style={{marginTop: 20, width: '100%'}}
              onPress={() => console.log('Pressed')}>
              Kehadiran Saya
            </Button>
          </View>
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
    fontSize: 16,
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
});
