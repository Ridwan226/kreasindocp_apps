import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getData} from '../../utils';
import {LogoKorpie} from '../../assets';
import RNFS from 'react-native-fs';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    clearCache();
    setTimeout(() => {
      getData('tokenLogin')
        .then(res => {
          if (res) {
            navigation.reset({index: 0, routes: [{name: 'MainApp'}]});
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
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
      <View style={styles.container}>
        {/* <Image
          source={require('../../assets/image/logo.png')}
          style={styles.imgLogo}
        /> */}
        <LogoKorpie />
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
