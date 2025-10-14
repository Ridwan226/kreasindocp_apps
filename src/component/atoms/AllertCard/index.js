import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const AllertCard = ({text, type = 'warning'}) => {
  return (
    <View style={styles.container(type)}>
      <Text style={styles.text(type)}>{text}</Text>
    </View>
  );
};

export default AllertCard;

const styles = StyleSheet.create({
  container: type => ({
    padding: 10,
    width: '100%',
    backgroundColor: type == 'warning' ? '#fff3cd' : '#1b8050ff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: type == 'warning' ? '#856404' : '#75b798',
    marginVertical: 10,
  }),

  text: type => ({
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: type == 'warning' ? '#856404' : '#1b8050ff',
  }),
});
