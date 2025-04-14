import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
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

  return (
    <View style={styles.container(task)}>
      {/* {projectSelected ? (
        <TouchableOpacity
          onPress={() => setViewList(!viewList)}
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
      ) : (
        <TouchableOpacity
          onPress={() => setViewList(!viewList)}
          activeOpacity={0.7}
          style={{marginBottom: 10}}>
          <View style={styles.wpLocation}>
            <Text style={styles.txLokasi}>Lokasi Proyek</Text>
            <AntDesign name="caretdown" size={20} color={'#DD4017'} />
          </View>
          <Text style={styles.txAddress}>
            {data?.[0]?.address} | Jarak :{' '}
            {parseInt(data?.[0]?.distance_in_meters).toLocaleString()} m
          </Text>
        </TouchableOpacity>
      )} */}

      <TouchableOpacity
        onPress={() => setViewList(!viewList)}
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

      <View style={styles.wpList}>
        {viewList &&
          data?.map((item, index) => (
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
      </View>
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
    position: 'absolute',
    width: '100%',
    top: '100%',
    left: 10,
    backgroundColor: '#fff',
    zIndex: 100,
  },
});
