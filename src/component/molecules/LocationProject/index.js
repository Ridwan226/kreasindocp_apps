import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
const LocationProject = ({data, task = false}) => {
  const [viewList, setViewList] = useState(false);

  return (
    <View style={styles.container(task)}>
      <TouchableOpacity
        onPress={() => setViewList(!viewList)}
        activeOpacity={0.7}>
        <View style={styles.wpLocation}>
          <Text style={styles.txLokasi}>Lokasi Proyek</Text>
          <AntDesign name="caretdown" size={20} color={'#DD4017'} />
        </View>
        <Text style={styles.txAddress}>{data?.[0]?.address}</Text>
      </TouchableOpacity>
      {viewList &&
        data?.map((item, index) =>
          index != 0 ? (
            <View key={index}>
              <Text style={styles.txAddress}>{item?.address}</Text>
            </View>
          ) : null,
        )}
    </View>
  );
};

export default LocationProject;

const styles = StyleSheet.create({
  container: task => ({
    backgroundColor: task ? '#F3F3F3' : '#fff',
    padding: task ? 10 : 0,
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
});
