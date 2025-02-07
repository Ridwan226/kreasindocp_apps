import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Gap, HeaderPrimary} from '../../component';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
const RequestMenuScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.page}>
      <HeaderPrimary onPress={() => navigation.goBack()} title="Request Menu" />
      <Gap height={20} />
      <View style={styles.wpMenu}>
        <TouchableOpacity style={styles.wpIcon}>
          <MaterialCommunityIcons
            name="clock-time-two-outline"
            size={50}
            color={'#DD4017'}
          />
          <Text style={styles.txMenu}>Overtime</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.wpIcon}>
          <Fontisto name="holiday-village" size={50} color={'#DD4017'} />
          <Text style={styles.txMenu}>Overtime</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RequestMenuScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wpMenu: {
    flexDirection: 'row',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wpIcon: {
    width: '40%',
    height: 100,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DD4017',
    margin: 15,
  },
  txMenu: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#DD4017',
    marginVertical: 5,
  },
});
