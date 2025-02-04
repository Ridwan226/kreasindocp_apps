import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

const HomeScreen = () => {
  const {isLoading} = useSelector(state => state.globalReducer);
  console.log('isLoading', isLoading);
  const dispatch = useDispatch();

  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
