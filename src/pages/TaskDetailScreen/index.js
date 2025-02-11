import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Gap, HeaderPrimary} from '../../component';
import CheckBox from '@react-native-community/checkbox';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {gettaskDataDetail} from '../../redux/action/task';

const TaskDetailScreen = ({navigation, route}) => {
  console.log('item', route.params);
  const [data, setData] = useState();
  const {item} = route.params;
  const dispatch = useDispatch();

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    let form = new FormData();
    form.append('id_task', item?.task_id);
    dispatch(gettaskDataDetail(form, setData));
  };

  const setToggleCheckBox = (newValue, item) => {
    console.log('setToggleCheckBox', newValue);
    console.log('item', item);

    let form = new FormData();
    form.append('taskid', item?.task_id);
    form.append('status', newValue ? '1' : '0');
    form.append('checklist_id', item?.checklist_id);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
      <HeaderPrimary onPress={() => navigation.goBack()} title="Task Detail" />
      <View style={styles.wpHeadInfo}>
        <Text style={styles.txTask}>Task #{item?.number}</Text>
        <Text style={styles.txTitle}>{item?.task_name}</Text>
      </View>
      <Gap height={10} />
      <View style={styles.wpLocation}>
        <Text style={styles.txTask}>Lokasi</Text>
        <Text style={styles.txLocation}>{data?.project?.address}</Text>
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
          <Text style={styles.txHeadDesc}>
            {moment(item.start_date).format('DD-MM-YYYY') || item.start_date}
          </Text>
        </View>
        <View style={[styles.wpItemBody, {borderLeftWidth: 2, padding: 3}]}>
          <Text style={styles.txHead}>End</Text>
          <Text style={styles.txHeadDesc}>
            {moment(item.end_date).format('DD-MM-YYYY') || item.end_date}
          </Text>
        </View>
        <View style={[styles.wpItemBody, {borderLeftWidth: 2, padding: 3}]}>
          <Text style={styles.txHead}>Est Hour</Text>
          <Text style={styles.txHeadDesc}>{item.task_hour}</Text>
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

        {data?.ceklist?.length > 0 ? (
          data?.ceklist?.map((itemCeklis, index) => (
            <View style={styles.wpItemCekbox} key={index}>
              <CheckBox
                value={itemCeklis?.is_checked == 1 ? true : false}
                onValueChange={newValue =>
                  setToggleCheckBox(newValue, itemCeklis)
                }
              />
              <Text style={styles.txLocation}>
                {itemCeklis?.checklist_text}
              </Text>
            </View>
          ))
        ) : (
          <View>
            <Text>No Data</Text>
          </View>
        )}
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
    alignItems: 'center',
  },
});
