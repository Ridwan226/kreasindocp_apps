import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getData} from '../../utils';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
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

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
      <View style={styles.container}>
        <Image
          source={require('../../assets/image/logo.png')}
          style={styles.imgLogo}
        />
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
