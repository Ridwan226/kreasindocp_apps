import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Image} from 'react-native';
import {Button, Dialog} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const CardUser = ({onPressLogout, name, username, image}) => {
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
            <Text style={styles.txDesc}>@{username} </Text>
          </View>
        </View>
        <Button
          icon="logout"
          mode="outlined"
          style={styles.btnLogout}
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
    marginVertical: 20,
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
    borderColor: '#02275D',
    borderWidth: 1,
  },
});
