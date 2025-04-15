import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const AllertCard = ({text}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default AllertCard;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: '100%',
    backgroundColor: '#fff3cd',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#856404',
    marginVertical: 10,
  },

  text: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#856404',
  },
});
