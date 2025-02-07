import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Gap} from '../../atoms';

const CardClient = () => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7}>
      <Image
        source={{
          uri: 'https://kreasindocp.graphie.design/public/uploads/clients/thumb/download%20(24).jpeg',
        }}
        style={styles.img}
      />
      <Gap width={10} />
      <View>
        <Text style={styles.name}>Name</Text>
        <Text style={styles.email}>Email</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CardClient;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    marginVertical: 5,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
  },
  img: {
    width: 50,
    height: 50,
    objectFit: 'cover',
    borderRadius: 100 / 2,
  },
  name: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    color: '#02275D',
  },
  email: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#02275D',
  },
});
