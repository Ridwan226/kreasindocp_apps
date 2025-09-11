import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Gap, HeaderPrimary} from '../../component';
import {useDispatch} from 'react-redux';
import {gettaskDataDetail, logItemTask} from '../../redux/action/task';
import moment from 'moment';

const LogItemTaskScreen = ({navigation, route}) => {
  const [data, setData] = useState({});
  const {item} = route.params;
  const dispatch = useDispatch();
  console.log('data log item', item);
  useEffect(() => {
    getDataTask();
  }, []);

  const getDataTask = () => {
    let form = new FormData();
    form.append('checklist_id', item?.checklist_id);
    form.append('task_type', item?.task_type ? 1 : 0);
    dispatch(logItemTask(form, setData));
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
      <HeaderPrimary onPress={() => navigation.goBack()} title="Log Data" />
      <View style={styles.wpHeadInfo}>
        <Text style={styles.txTask}>Task</Text>
        <Text style={styles.txTitle}>{data?.item?.name_desc}</Text>
      </View>
      <ScrollView contentContainerStyle={{padding: 10}}>
        {data?.log?.length < 1 ? (
          <Text style={{textAlign: 'center', marginTop: 20}}>
            Data Log Not Found
          </Text>
        ) : (
          data?.log?.map((itemLog, index) => (
            <View style={styles.itemWp} key={index}>
              <Text>Log By : {itemLog?.first_name}</Text>
              <Text>
                Time : {moment(itemLog?.created_at).format('DD MMM YYYY HH:mm')}
              </Text>
              <Text>Description : {itemLog?.description}</Text>
            </View>
          ))
        )}

        <Gap height={50} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default LogItemTaskScreen;

const styles = StyleSheet.create({
  wpHeadInfo: {
    padding: 10,
    backgroundColor: '#F3F3F3',
  },
  txTask: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    color: '#999999',
  },
  txTitle: {
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    color: '#02275D',
  },
  itemWp: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#F3F3F3',
    borderRadius: 10,
  },
});
