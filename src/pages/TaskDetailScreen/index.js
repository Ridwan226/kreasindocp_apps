import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Gap, HeaderPrimary} from '../../component';
import CheckBox from '@react-native-community/checkbox';

const TaskDetailScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
      <HeaderPrimary onPress={() => navigation.goBack()} title="Task Detail" />
      <View style={styles.wpHeadInfo}>
        <Text style={styles.txTask}>Task #1</Text>
        <Text style={styles.txTitle}>
          Perbaikan Kamar Mandi Utama Perbaikan Kamar Mandi Utama
        </Text>
      </View>
      <Gap height={10} />
      <View style={styles.wpLocation}>
        <Text style={styles.txTask}>Lokasi</Text>
        <Text style={styles.txLocation}>
          Jl. Pluit Karang Indah VIII No.35, RT.5/RW.12, Pluit, Kec.
          Penjaringan, Jkt Utara, Daerah Khusus Ibukota Jakarta 14450
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 5,
          marginHorizontal: 10,
        }}>
        <View style={styles.wpItemBody}>
          <Text style={styles.txHead}>Start</Text>
          <Text style={styles.txHeadDesc}>10-01-2025</Text>
        </View>
        <View style={[styles.wpItemBody, {borderLeftWidth: 2, padding: 3}]}>
          <Text style={styles.txHead}>End</Text>
          <Text style={styles.txHeadDesc}>10-01-2026</Text>
        </View>
        <View style={[styles.wpItemBody, {borderLeftWidth: 2, padding: 3}]}>
          <Text style={styles.txHead}>Est Hour</Text>
          <Text style={styles.txHeadDesc}>23</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 5,
          marginHorizontal: 10,
        }}>
        <Text style={styles.txTitle}>TIM</Text>
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
      </View>
      <View
        style={{
          marginVertical: 5,
          marginHorizontal: 10,
        }}>
        <Text style={styles.txTitle}>Sub Task</Text>
        <View style={styles.wpItemCekbox}>
          <CheckBox
            disabled={false}
            value={true}
            onValueChange={newValue => setToggleCheckBox(newValue)}
          />
          <Text style={styles.txLocation}>
            Sub Task 1 Sub Task 1 Sub Task 1 Sub Task 1 Sub Task 1 Sub Task 1
            Sub Task 1 Sub Task 1
          </Text>
        </View>
        <View style={styles.wpItemCekbox}>
          <CheckBox
            disabled={false}
            value={true}
            onValueChange={newValue => setToggleCheckBox(newValue)}
          />
          <Text style={styles.txLocation}>
            Sub Task 1 Sub Task 1 Sub Task 1 Sub Task 1 Sub Task 1 Sub Task 1
            Sub Task 1 Sub Task 1
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TaskDetailScreen;

const styles = StyleSheet.create({
  wpHeadInfo: {
    padding: 10,
    backgroundColor: '#F3F3F3',
  },
  txTitle: {
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    color: '#02275D',
  },
  txTask: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    color: '#999999',
  },
  wpLocation: {
    padding: 10,
  },
  txLocation: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#02275D',
    maxWidth: '90%',
  },
  wpItemBody: {
    width: '33.33%',
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderColor: '#DDDDDD',
  },
  txHead: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 13,
    color: '#999999',
  },
  txHeadDesc: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: '#02275D',
  },
  wpImg: {
    flexDirection: 'row',
    marginVertical: 5,
    maxWidth: '70%',
    marginRight: 10,
  },
  imgUser: {
    width: 35,
    height: 35,
    borderRadius: 50 / 2,
    objectFit: 'cover',
    marginRight: -11,
    borderWidth: 3,
    borderColor: '#fff',
  },
  wpItemCekbox: {
    flexDirection: 'row',
    marginVertical: 5,
  },
});
