import CheckBox from '@react-native-community/checkbox';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {Gap, HeaderPrimary} from '../../component';
import {
  addSubTask,
  gettaskDataDetail,
  updateCeklistTask,
} from '../../redux/action/task';
import {getData, showMessage} from '../../utils';
import Modal from 'react-native-modal';
import Entypo from 'react-native-vector-icons/Entypo';

const TaskDetailScreen = ({navigation, route}) => {
  console.log('item', route.params);

  const [data, setData] = useState({});
  const [user, setDataUser] = useState({});
  const [visible, setVisible] = useState(false);
  const [desc, setDesc] = useState('');
  const {item} = route.params;
  const dispatch = useDispatch();

  useEffect(() => {
    getDataTask();
    getDataUserLocal();
  }, []);

  const getDataUserLocal = async () => {
    getData('userProfile')
      .then(res => {
        setDataUser(res);
        console.log('res userProfile', res);
      })
      .catch(err => {
        console.log('err userProfile', err);
      });
  };

  const getDataTask = () => {
    let form = new FormData();
    form.append('id_task', item?.task_id);
    dispatch(gettaskDataDetail(form, setData));
  };

  const setToggleCheckBox = async (newValue, item) => {
    console.log('setToggleCheckBox', newValue);
    console.log('item', item);

    let form = new FormData();
    form.append('taskid', item?.task_id);
    form.append('status', newValue ? '1' : '0');
    form.append('checklist_id', item?.checklist_id);
    console.log('form', form);
    try {
      await dispatch(updateCeklistTask(form));
      getDataTask();
    } catch (error) {
      console.log('Clock in failed', error);
    }
  };

  const addDataSubTask = async () => {
    if (desc == '') {
      showMessage('Silahkan Isi Deskripsi Task');
      toggleModal();
      return;
    }
    let form = new FormData();
    form.append('taskid', item?.task_id);
    form.append('desc', desc);
    try {
      await dispatch(addSubTask(form));
      toggleModal();
      getDataTask();
      setDesc('');
    } catch (error) {
      console.log('Clock in failed', error);
    }
  };

  const setValueCheckBox = itemCeklis => {
    if (user?.role == 3) {
      if (itemCeklis?.spv_cek == 1) {
        return true;
      } else {
        return false;
      }
    } else if (user?.role == 10) {
      if (itemCeklis?.spv_cek == 1) {
        return true;
      } else {
        if (itemCeklis?.staff_cek == 1) {
          return true;
        } else {
          return false;
        }
      }
    }
  };
  const toggleModal = () => {
    setVisible(!visible);
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
      <ScrollView>
        <View
          style={{
            marginVertical: 5,
            marginHorizontal: 10,
          }}>
          <View style={styles.wpSubTask}>
            <Text style={styles.txTitle}>Sub Task</Text>
            <View style={styles.wpSubTaskItem}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    width: 15,
                    height: 15,
                    borderRadius: 2,
                    marginHorizontal: 5,
                    backgroundColor: '#DAE9D2',
                  }}
                />
                <Text>SPV</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: 15,
                    height: 15,
                    borderRadius: 2,
                    marginHorizontal: 5,
                    backgroundColor: '#D0E1F3',
                  }}
                />
                <Text>Staff</Text>
              </View>
            </View>
          </View>

          {data?.ceklist?.length > 0 ? (
            data?.ceklist?.map((itemCeklis, index) => (
              <View
                style={
                  itemCeklis?.spv_cek == 1
                    ? styles.wpItemCekboxSpv
                    : itemCeklis?.staff_cek == 1
                    ? styles.wpItemCekboxStaff
                    : styles.wpItemCekbox
                }
                key={index}>
                <CheckBox
                  value={setValueCheckBox(itemCeklis)}
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
      </ScrollView>
      {(user?.role == 3 || user?.role == 9) && (
        <>
          <View
            style={{
              flex: 1,
              position: 'absolute',
              bottom: 0,
              width: '100%',
              padding: 10,
            }}>
            <Button
              mode="contained"
              style={{borderRadius: 10, backgroundColor: '#DD4017'}}
              onPress={() => toggleModal()}>
              Add SubTask
            </Button>
          </View>
          <Modal isVisible={visible}>
            <View style={styles.wpModal}>
              <View style={styles.wpModalHeader}>
                <Text style={styles.txModalHeader}>Add SubTask!</Text>
                <TouchableOpacity onPress={() => toggleModal()}>
                  <Entypo name="cross" size={30} color={'#DD4017'} />
                </TouchableOpacity>
              </View>
              <Gap height={10} />
              <TextInput
                mode="outlined"
                label="Description"
                value={desc}
                onChangeText={text => setDesc(text)}
                placeholder="Ex : Membobok Dinding Kamar Utama"
                multiline
                numberOfLines={6}
                style={styles.textArea}
              />
              <Gap height={20} />

              <Button
                mode="contained"
                style={{borderRadius: 10, backgroundColor: '#DD4017'}}
                onPress={() => addDataSubTask()}>
                Simpan & tambah ke list
              </Button>
            </View>
          </Modal>
        </>
      )}
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
    marginRight: -7,
    borderWidth: 3,
    borderColor: '#fff',
  },

  wpSubTask: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wpSubTaskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  wpItemCekbox: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center',
    paddingVertical: 5,
  },
  wpItemCekboxStaff: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 5,
    borderColor: '#638AC9 ',
    backgroundColor: '#D0E1F3',
  },

  wpItemCekboxSpv: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 5,

    borderColor: '#A1C792',
    backgroundColor: '#DAE9D2',
  },

  // Style Modal

  wpModal: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 10,
    maxHeight: '60%',
    position: 'relative',
  },
  wpModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#DD4017',
  },
  txModalHeader: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#DD4017',
  },
});
