import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const ListInfo = ({
  icon = 'list',
  title = 'ListInfo',
  desc = 'ListInfo',
  type = 'list',
}) => {
  if (type == 'list') {
    return (
      <View style={styles.container}>
        <View style={styles.wpInfo}>
          <FontAwesome5 name={icon} size={16} color={'#02275D'} />
          <Text style={styles.textTitle}>{title}</Text>
        </View>
        <Text style={styles.txDesc}>{desc}</Text>
      </View>
    );
  }
  return (
    <View style={styles.containerDetail}>
      <View style={styles.wpInfoDetail}>
        <FontAwesome5 name={icon} size={16} color={'#02275D'} />
        <Text style={styles.textTitle}>{title}</Text>
      </View>
      <Text style={styles.txDescDetail}>{desc}</Text>
    </View>
  );
};

export default ListInfo;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#cfd1d1',
    marginVertical: 5,
  },
  containerDetail: {
    borderBottomWidth: 1,
    borderBottomColor: '#cfd1d1',
    marginVertical: 10,
  },
  wpInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wpInfoDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  textTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#02275D',
    marginLeft: 10,
  },
  txDesc: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    color: '#02275D',
    textAlign: 'right',
    maxWidth: '50%',
  },
  txDescDetail: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    color: '#02275D',
  },
});
