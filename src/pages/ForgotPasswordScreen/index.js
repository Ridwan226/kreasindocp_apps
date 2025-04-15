import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Gap, HeaderPrimary} from '../../component';
import InputScrollView from 'react-native-input-scroll-view';
import {Button, TextInput} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {useForm} from '../../utils';
import {ForgotPasswordAccton} from '../../redux/action';
const {width, height} = Dimensions.get('window');

const ForgotPasswordScreen = ({navigation}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const dispatch = useDispatch();
  const [form, setForm] = useForm({
    email: '',
  });

  const onSubmit = () => {
    if (form.password == '' || form.iusername == '') {
      showMessage('Silahkan Lengkapi Data');
      return;
    }

    const data = new FormData();
    data.append('email', form.email);

    dispatch({type: 'SET_LOADING', value: true});
    dispatch(ForgotPasswordAccton(data));
    setForm('email', '');
  };
  return (
    <SafeAreaView style={styles.page}>
      <HeaderPrimary
        onPress={() => navigation.goBack()}
        title="Forgot Password"
      />
      <InputScrollView style={styles.scroll}>
        <View style={styles.contentWrapper}>
          <Image
            source={require('../../assets/image/Absence.png')}
            style={styles.imgLogo}
          />
          <Text style={styles.title}>KORPIE</Text>
          <Text style={styles.desc}>Attendance</Text>
          <View style={styles.wpForm}>
            <TextInput
              mode="outlined"
              label="Email"
              value={form.email}
              onChangeText={value => setForm('email', value)}
              placeholder="Type something"
            />

            <Gap height={20} />
            <Button
              // icon="login"
              mode="contained"
              style={styles.button}
              labelStyle={{
                color: '#FFF',
                fontSize: 18,
                fontFamily: 'Poppins-Medium',
              }}
              onPress={onSubmit}>
              Kirim Email
            </Button>
            <Gap height={20} />

            {/* <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPasswordScreen')}
              activeOpacity={0.7}>
              <Text style={styles.txForgot}>Forgot Password</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </InputScrollView>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;

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
    height: width / 2,
    objectFit: 'contain',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 50,
    color: '#02275D',
    lineHeight: 50,
  },
  desc: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 25,
    color: '#468190',
  },
  wpForm: {
    width: '100%',
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#DD4017',
    borderRadius: 10,
    paddingVertical: 5,
  },
  txForgot: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 17,
    color: '#468190',
    textAlign: 'center',
  },
});
