import React, {useRef} from 'react';
import {
  Dimensions,
  Linking,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {NoKoneksi} from '../../../assets';
import {Gap} from '../../atoms';
import {Button} from 'react-native-paper';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const NoInternet = () => {
  const animation = useRef(null);
  const modalizeRef = useRef(null);

  const handleOpenSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      Linking.openSettings();
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          position: 'absolute',
          width: width,
          height: height / 1.2,
          backgroundColor: '#fff',
          bottom: 0,
          borderTopLeftRadius: RFValue(20),
          borderTopRightRadius: RFValue(20),
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: RFValue(25),
          paddingHorizontal: RFValue(20),
        }}>
        <Gap height={RFValue(20)} />
        <NoKoneksi width={RFValue(300)} height={RFValue(300)} />
        <Gap height={RFValue(20)} />
        <Text style={styles.text}>Koneksi Terputus!</Text>
        <Gap height={RFValue(20)} />
        <Text style={styles.subText}>
          Mungkin ada masalah pada koneksi internetmu. Coba cek atau sambungkan
          ke Wi-Fi!
        </Text>
        <Gap height={RFValue(40)} />
        <Button
          onPress={() => Linking.openSettings()}
          mode="contained"
          style={{
            width: '100%',
            paddingVertical: RFValue(10),
            backgroundColor: '#DD4017',
          }}>
          <Text style={{fontSize: RFValue(16), fontFamily: 'Poppins-SemiBold'}}>
            Buka Pengaturan
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default NoInternet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(226, 118, 155, 0.34);',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: RFValue(250),
    height: RFValue(250),
    resizeMode: 'contain',
  },
  text: {
    fontSize: RFValue(16),
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
  },
  subText: {
    marginTop: RFValue(-10),
    fontSize: RFValue(11),
    fontFamily: 'Poppins-Medium',
    color: '#242424',
    textAlign: 'center',
  },
});
