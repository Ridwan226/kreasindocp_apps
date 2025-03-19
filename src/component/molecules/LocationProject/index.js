import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
const LocationProject = ({data, task = false}) => {
  const [viewList, setViewList] = useState(false);

  return (
    <View style={styles.container(task)}>
      <TouchableOpacity
        onPress={() => setViewList(!viewList)}
        activeOpacity={0.7}
        style={{marginBottom: 10}}>
        <View style={styles.wpLocation}>
          <Text style={styles.txLokasi}>Lokasi Proyek</Text>
          <AntDesign name="caretdown" size={20} color={'#DD4017'} />
        </View>
        <Text style={styles.txAddress}>{data?.[0]?.address}</Text>
      </TouchableOpacity>
      <View style={styles.wpList}>
        {viewList &&
          data?.map((item, index) =>
            index != 0 ? (
              <View key={index} style={styles.locationItem}>
                <Text style={styles.txAddressItem}>{item?.address}</Text>
              </View>
            ) : null,
          )}
      </View>
    </View>
  );
};

export default LocationProject;

const styles = StyleSheet.create({
  container: task => ({
    backgroundColor: task ? '#F3F3F3' : '#fff',
    padding: task ? 10 : 0,
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
    left: 0,
    backgroundColor: '#fff',
    zIndex: 100,
  },
});
