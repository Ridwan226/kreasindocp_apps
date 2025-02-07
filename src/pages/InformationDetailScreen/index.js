import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {HeaderPrimary} from '../../component';

const InformationDetailScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
      <HeaderPrimary
        title="Information Detail"
        onPress={() => navigation.goBack()}
      />
      <Text>InformationScreen</Text>
    </SafeAreaView>
  );
};

export default InformationDetailScreen;

const styles = StyleSheet.create({});
