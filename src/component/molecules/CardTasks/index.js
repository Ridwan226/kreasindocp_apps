import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {statusText} from '../../../utils';
import moment from 'moment';

const CardTasks = ({item}) => {
  const navigation = useNavigation();
  let color = '#FF0000';
  if (item.empty) {
    return (
      <View style={styles.container}>
        <Text>Tidak Ada Data</Text>
      </View>
    );
  }

  if (item.task_status == 1) {
    color = '#7267EF';
  } else if (item.task_status == 2) {
    color = '#17C666';
  } else if (item.task_status == 3) {
    color = '#EA4D4D';
  } else if (item.task_status == 4) {
    color = '#6c757d';
  } else if (item.task_status == 0) {
    color = '#ffa21d';
  } else {
    color = '#FF0000';
  }

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={() => navigation.push('TaskDetailScreen', {item: item})}>
      <View>
        <Text style={styles.txHead}>Task #{item.number}</Text>
        <Text style={styles.txTitle}>{item.task_name}</Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 5,
        }}>
        <View style={styles.wpItemBody}>
          <Text style={styles.txHead}>Mulai</Text>
          <Text style={styles.txHeadDesc}>
            {moment(item.start_date).format('DD-MM-YYYY') || item.start_date}
          </Text>
        </View>
        <View style={[styles.wpItemBody, {borderLeftWidth: 2, padding: 3}]}>
          <Text style={styles.txHead}>Selesai</Text>
          <Text style={styles.txHeadDesc}>
            {moment(item.end_date).format('DD-MM-YYYY') || item.end_date}
          </Text>
        </View>
        <View style={[styles.wpItemBody, {borderLeftWidth: 2, padding: 3}]}>
          <Text style={styles.txHead}>Jam Kerja</Text>
          <Text style={styles.txHeadDesc}>{item.task_hour}</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 5,
        }}>
        <Text style={styles.txTitle}>TIM</Text>
        <View style={styles.wpImg}>
          {item?.assigned_to?.map((item, index) => {
            if (item?.img == null) return null;
            return (
              <Image
                key={index}
                source={{
                  uri: item?.img,
                }}
                style={styles.imgUser}
              />
            );
          })}
        </View>
      </View>
      <View style={styles.wpStatus(color)} activeOpacity={0.7}>
        <Text style={styles.txStatus}>
          {statusText(item.task_status)} ({item?.task_progress}%)
        </Text>
      </View>
    </TouchableOpacity>
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
    borderColor: '#DDDDDD',
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
  txTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
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
    marginRight: -7,
    borderWidth: 3,
    borderColor: '#fff',
  },
  txStatus: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    color: '#FFF',
  },
  wpStatus: color => ({
    width: '100%',
    alignItems: 'center',
    backgroundColor: color,
    borderRadius: 5,
    paddingVertical: 3,
  }),
});
