import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {HeaderPrimary} from '../../component';

const ClientScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
      <HeaderPrimary
        onPress={() => navigation.goBack()}
        title={'Manage Client'}
      />
      <Text>ClientScreen</Text>
    </SafeAreaView>
  );
};

export default ClientScreen;

const styles = StyleSheet.create({});
