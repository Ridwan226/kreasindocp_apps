import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';

const CardTasks = ({item}) => {
  console.log('sds', item);
  if (item.empty) {
    console.log('Please select', item);
    return (
      <View style={styles.container}>
        <Text>ga ada</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.wpHead}>
        <Text style={styles.texHead}>
          Website RedesignWebsite Redesign Website Redesign Website Redesign
        </Text>
        <Text style={styles.texHead}>2025-02-03</Text>
      </View>
      <View>
        <Text style={styles.txBody}>
          Redesign the homepage layout to improve user navigation and visual app
        </Text>
        <Text style={styles.txBody}>Due : 2025-02-28</Text>
      </View>
      <View style={styles.wpImg}>
        <Image
          source={{
            uri: 'https://kreasindocp.graphie.design/public/uploads/users/download%20(19).jpeg',
          }}
          style={styles.imgUser}
        />
        <Image
          source={{
            uri: 'https://kreasindocp.graphie.design/public/uploads/users/download%20(19).jpeg',
          }}
          style={styles.imgUser}
        />
        <Image
          source={{
            uri: 'https://kreasindocp.graphie.design/public/uploads/users/download%20(19).jpeg',
          }}
          style={styles.imgUser}
        />
      </View>
      <View style={styles.wpFooter}>
        <Text style={styles.txStatus}>Status</Text>
        <TouchableOpacity>
          <Feather name="eye" size={30} color={'#DD4017'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CardTasks;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    width: '100%',
    borderRadius: 5,
    marginVertical: 10,
    padding: 7,
    borderWidth: 1,
    borderBlockColor: '#DDDDDD',
  },
  wpHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
    marginVertical: 5,
  },
  texHead: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#02275D',
    maxWidth: '50%',
  },
  txBody: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#02275D',
    maxWidth: '90%',
  },
  wpImg: {
    flexDirection: 'row',
    marginVertical: 5,
    borderTopWidth: 1,
    borderTopColor: '#DDDDDD',
    paddingTop: 10,
  },
  imgUser: {
    width: 35,
    height: 35,
    borderRadius: 50 / 2,
    objectFit: 'cover',
    marginRight: -11,
  },
  wpFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  txStatus: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: '#e8e7fc',
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    color: '#02275D',
  },
});
