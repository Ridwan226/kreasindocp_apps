import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
const LocationProject = ({data, task = false}) => {
  const [viewList, setViewList] = useState(false);
  const [projectSelected, setProjectSelected] = useState({});
  const dispatch = useDispatch();
  const {projectId, dataShift} = useSelector(state => state.globalReducer);
  useEffect(() => {
    const filteredData = dataShift?.projects?.filter(
      item => item.project_id === projectId,
    )[0];
    setProjectSelected(filteredData);
  }, [projectId, dataShift]);

  const setProject = item => {
    dispatch({
      type: 'SET_PROJECT_ID',
      value: item?.project_id,
    });
    // setProjectSelected(item);
    setViewList(!viewList);
  };

  const showModal = () => setViewList(true);
  const hideModal = () => setViewList(false);

  return (
    <View style={styles.container(task)}>
      <TouchableOpacity
        onPress={() => showModal()}
        activeOpacity={0.7}
        style={{marginBottom: 10}}>
        <View style={styles.wpLocation}>
          <Text style={styles.txLokasi}>Lokasi Proyek</Text>
          <AntDesign name="caretdown" size={20} color={'#DD4017'} />
        </View>
        <Text style={styles.txAddress}>
          {projectSelected?.address} | Jarak :{' '}
          {parseInt(projectSelected?.distance_in_meters).toLocaleString()} m
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={viewList}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setViewList(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={[styles.wpList, {height: 300, flex: 1}]}>
              <ScrollView nestedScrollEnabled={true}>
                {data?.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.locationItem}
                    onPress={() => setProject(item)}>
                    <Text style={styles.txAddressItem}>
                      {item?.address} | Jarak :{' '}
                      {parseInt(item?.distance_in_meters).toLocaleString()} m
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
      {/* {viewList && (
        <View style={[styles.wpList, {height: 300}]}>
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.locationItem}
                onPress={() => setProject(item)}>
                <Text style={styles.txAddressItem}>
                  {item?.address} | Jarak :{' '}
                  {parseInt(item?.distance_in_meters).toLocaleString()} m
                </Text>
              </TouchableOpacity>
            )}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={true}
          />
        </View>
      )} */}
    </View>
  );
};

export default LocationProject;

const styles = StyleSheet.create({
  container: task => ({
    backgroundColor: task ? '#F3F3F3' : '#fff',
    padding: task ? 10 : 10,
    position: 'relative',
    width: '100%',
  }),
  wpLocation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txLokasi: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    color: '#ACACAF',
  },
  txAddress: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#02275D',
  },
  txAddressItem: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    color: '#666',
  },
  locationItem: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    padding: 10,
  },
  wpList: {
    width: '100%',
    left: 10,
    backgroundColor: '#fff',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
