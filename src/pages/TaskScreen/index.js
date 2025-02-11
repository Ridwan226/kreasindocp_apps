import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CardTasks, Gap, HeaderPrimary, LocationProject} from '../../component';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Button} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {gettaskData} from '../../redux/action/task';
import {useFocusEffect} from '@react-navigation/native';
import {getShiftData} from '../../redux/action/shift';

const TaskScreen = ({navigation}) => {
  const [status, setStatus] = useState('semua');
  const [data, setData] = useState([]);
  const [dataShift, setDataShift] = useState({});
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      getData();
      getDataShift();
    }, [status]),
  );

  // useEffect(() => {
  //   getData();
  // }, [status]);
  const getDataShift = () => {
    dispatch(getShiftData(setDataShift));
  };
  const getData = () => {
    let form = new FormData();
    form.append('status', status);
    dispatch(gettaskData(form, setData));
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
      <HeaderPrimary
        onPress={() => navigation.goBack()}
        title="My Tasks"
        // onPressIcon={() => navigation.push('TasksAddScreen')}
        // iconName={'plus'}
      />
      {dataShift?.projects?.length > 0 && (
        <>
          <LocationProject data={dataShift?.projects} task={true} />
        </>
      )}

      <Gap height={10} />
      <View style={styles.wpList}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <Button
            mode="outlined"
            style={styles.wpButtonStatus(status === 'semua' ? true : false)}
            labelStyle={styles.txButtonStatus(
              status === 'semua' ? true : false,
            )}
            onPress={() => setStatus('semua')}>
            Semua
          </Button>
          <Button
            mode="outlined"
            style={styles.wpButtonStatus(status == 1 ? true : false)}
            labelStyle={styles.txButtonStatus(status == 1 ? true : false)}
            onPress={() => setStatus(1)}>
            In Progress
          </Button>
          <Button
            mode="outlined"
            style={styles.wpButtonStatus(status == 2 ? true : false)}
            labelStyle={styles.txButtonStatus(status == 2 ? true : false)}
            onPress={() => setStatus(2)}>
            Completed
          </Button>
          <Button
            mode="outlined"
            style={styles.wpButtonStatus(status == 4 ? true : false)}
            labelStyle={styles.txButtonStatus(status == 4 ? true : false)}
            onPress={() => setStatus(4)}>
            On Hold
          </Button>
          <Button
            mode="outlined"
            style={styles.wpButtonStatus(status == 3 ? true : false)}
            labelStyle={styles.txButtonStatus(status == 3 ? true : false)}
            onPress={() => setStatus(3)}>
            Cancelled
          </Button>
          <Button
            mode="outlined"
            style={styles.wpButtonStatus(status === 0 ? true : false)}
            labelStyle={styles.txButtonStatus(status === 0 ? true : false)}
            onPress={() => setStatus(0)}>
            Not Started
          </Button>
        </ScrollView>
        <Gap height={10} />

        <FlatList
          data={data}
          renderItem={({item}) => <CardTasks item={item} />}
          numColumns={1}
          ListFooterComponent={<View style={{margin: 200}} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default TaskScreen;

const styles = StyleSheet.create({
  wpList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    flexWrap: 'wrap',
    alignItems: 'center',
    marginHorizontal: 0,
    // paddingBottom: 200,
  },
  wpButtonStatus: status => ({
    marginRight: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: status ? '#DD4017' : '#DDDDDD',
  }),
  txButtonStatus: status => ({
    color: status ? '#DD4017' : '#DDDDDD',
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
  }),
});
