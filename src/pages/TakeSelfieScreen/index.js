import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  Camera,
  useCameraDevice,
  useCameraDevices,
} from 'react-native-vision-camera';
import {ActivityIndicator} from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';

const TakeSelfieScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [hasPermission, setHasPermission] = useState(false);
  const camera = useRef();
  const device = useCameraDevice('front');
  useFocusEffect(
    useCallback(() => {
      (async () => {
        const status = await Camera.requestCameraPermission();
        setHasPermission(status === 'granted' ? true : false);
      })();
    }, []),
  );

  const takePhoto = async () => {
    try {
      // setIsLoadingButton(true);
      const photo = await camera.current.takePhoto({
        flash: 'off',
      });
      let name = photo.path.substring(
        photo.path.lastIndexOf('/') + 1,
        photo.path.length,
      );

      let dataImage = {
        uri: Platform.OS === 'ios' ? photo?.path : `file://${photo?.path}`,
        type: 'image/jpg',
        name: name,
      };
      dispatch({type: 'SET_IMAGE_SELFIE', value: dataImage});
      navigation.goBack();
    } catch (err) {}
  };

  if (device == null) {
    return <ActivityIndicator size={20} color={'#DD4017'} />;
  }
  return (
    <SafeAreaView>
      <TouchableOpacity
        style={styles.back}
        onPress={() => navigation.goBack()}
        activeOpacity={0.9}>
        <Feather name="arrow-left" size={25} color={'#fff'} />
      </TouchableOpacity>
      {device !== null && hasPermission ? (
        <Camera
          ref={camera}
          photo={true}
          style={styles.camera}
          device={device}
          isActive={true}
          frameProcessorFps={5}
        />
      ) : null}
      <View style={styles.wpCamera}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={takePhoto}
          style={[styles.wpIcon]}>
          <Entypo name="camera" size={25} color="#FFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TakeSelfieScreen;

const styles = StyleSheet.create({
  camera: {
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  back: {
    position: 'absolute',
    zIndex: 999,
    top: '5%',
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    padding: 10,
    borderRadius: 5,
  },
  wpCamera: {
    position: 'absolute',
    zIndex: 999,
    bottom: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  wpIcon: {
    width: 50,
    height: 50,
    padding: 10,
    backgroundColor: '#DD4017',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 5,
    elevation: 5,
  },
});
