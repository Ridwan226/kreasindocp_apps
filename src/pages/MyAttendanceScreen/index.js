import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {HeaderPrimary} from '../../component';

const MyAttendanceScreen = ({navigation}) => {
  return (
    <SafeAreaView>
      <HeaderPrimary
        onPress={() => navigation.goBack()}
        title="My Attendance"
      />
      <Text>MyAttendanceScreen </Text>
    </SafeAreaView>
  );
};

export default MyAttendanceScreen;

const styles = StyleSheet.create({});
