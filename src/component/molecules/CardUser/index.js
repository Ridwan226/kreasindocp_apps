import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Image} from 'react-native';
import {Button, Dialog} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const CardUser = ({onPressLogout, name, username, image, timeIn}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.wpContent}>
        <View style={styles.wpContent}>
          <Image
            source={{
              uri: `https://kreasindocp.graphie.design/public/uploads/users/thumb/${image}`,
            }}
            style={styles.img}
          />
          <View style={{marginLeft: 10}}>
            <Text style={styles.txTitle}>{name} </Text>
            {timeIn ? (
              <Text style={styles.txTimeiN}>Masuk Kerja {username} </Text>
            ) : (
              <Text style={styles.txDesc}>@{username} </Text>
            )}
          </View>
        </View>
        <Button
          mode="contained"
          style={styles.btnLogout}
          labelStyle={{
            color: '#999999',
            fontSize: 15,
            fontFamily: 'Poppins-Medium',
          }}
          onPress={onPressLogout}>
          Logout
        </Button>
      </View>
    </View>
  );
};

export default CardUser;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#02275D',
  },

  wpContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  img: {
    width: 50,
    height: 50,
    objectFit: 'cover',
    borderRadius: 100 / 2,
  },
  txTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#02275D',
  },
  txDesc: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#02275D',
  },
  btnLogout: {
    // borderColor: '#F3f3f3f3',
    // borderWidth: 1,
    backgroundColor: '#EEEEEE',
  },
  txTimeiN: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    color: 'green',
  },
});
