import React, {useState} from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import InputScrollView from 'react-native-input-scroll-view';
import {Button, TextInput} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Gap} from '../../component';
import {showMessage, useForm} from '../../utils';
import {useDispatch} from 'react-redux';
import {signInAccton} from '../../redux/action';
const {width, height} = Dimensions.get('window');
const LoginScreen = ({navigation}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const dispatch = useDispatch();
  const [form, setForm] = useForm({
    iusername: '',
    password: '',
  });

  const onSubmit = () => {
    if (form.password == '' || form.iusername == '') {
      showMessage('Silahkan Lengkapi Data');
      return;
    }

    const data = new FormData();
    data.append('iusername', form.iusername);
    data.append('password', form.password);

    dispatch({type: 'SET_LOADING', value: true});
    dispatch(signInAccton(data, navigation));
  };

  return (
    <SafeAreaView style={styles.page}>
      <InputScrollView style={styles.scroll}>
        <View style={styles.contentWrapper}>
          <Image
            source={require('../../assets/image/logo.png')}
            style={styles.imgLogo}
          />
          <Text style={styles.title}>Welcome to Kreasindocp </Text>
          <Text style={styles.desc}>
            Welcome back, Please login into an account
          </Text>
          <View style={styles.wpForm}>
            <TextInput
              mode="outlined"
              label="Username"
              value={form.iusername}
              onChangeText={value => setForm('iusername', value)}
              placeholder="Type something"
            />
            <Gap height={20} />
            <TextInput
              mode="outlined"
              label="Password"
              secureTextEntry={secureTextEntry}
              value={form.password}
              onChangeText={value => setForm('password', value)}
              right={
                <TextInput.Icon
                  icon={secureTextEntry ? 'eye' : 'eye-off'}
                  onPress={() => setSecureTextEntry(!secureTextEntry)}
                />
              }
            />

            <Gap height={20} />
            <Button
              icon="login"
              mode="contained"
              style={styles.button}
              onPress={onSubmit}>
              Login
            </Button>
          </View>
        </View>
      </InputScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scroll: {
    flex: 1,
  },
  contentWrapper: {
    margin: 15,
    paddingTop: 40,
    alignItems: 'center',
  },
  imgLogo: {
    width: width / 2,
    objectFit: 'contain',
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
    color: '#02275D',
  },
  desc: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#02275D',
  },
  wpForm: {
    width: '100%',
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#003399',
  },
});
