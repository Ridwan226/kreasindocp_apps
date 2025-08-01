import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getData} from '../../utils';
import {LogoKorpie} from '../../assets';
import RNFS from 'react-native-fs';
import {GLOBAL_DATA} from '../../config';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    clearCache();
    setTimeout(() => {
      getData('tokenLogin')
        .then(res => {
          if (res) {
            // navigation.reset({index: 0, routes: [{name: 'MainApp'}]});
            navigation.replace('Home');
          } else {
            navigation.replace('LoginScreen');
          }
        })
        .catch(err => {
          navigation.replace('LoginScreen');
        });
    }, 3000);
  }, []);

  const clearCache = async () => {
    try {
      const cacheDirectory = RNFS.CachesDirectoryPath;
      await RNFS.unlink(cacheDirectory);
    } catch (error) {}
  };

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: '#FFF', position: 'relative'}}>
      <View style={styles.container}>
        {/* <Image
          source={require('../../assets/image/logo.png')}
          style={styles.imgLogo}
        /> */}
        <LogoKorpie />
        <Text
          style={{
            position: 'absolute',
            bottom: 40,
            fontSize: 12,
            fontFamily: 'Poppins-Medium',
            color: '#000',
          }}>
          {GLOBAL_DATA.version}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgLogo: {
    width: '50%',
    objectFit: 'contain',
  },
});
