import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
const LocationProject = ({data}) => {
  const [viewList, setViewList] = useState(false);

  return (
    <View style={styles.container}>
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
