import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Gap, HeaderPrimary} from '../../component';
import {useDispatch} from 'react-redux';
import {viewDataMyAttendanceDetail} from '../../redux/action/shift';
import Lightbox from 'react-native-lightbox-v2';
import moment from 'moment';

const MyAttendanceDetailScreen = ({navigation, route}) => {
  const {item} = route.params;
  const [data, setData] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    let form = new FormData();
    form.append('time', item?.attendance_date);
    dispatch(viewDataMyAttendanceDetail(form, setData));
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
      <HeaderPrimary
        title="Detail Kehadiran Saya"
        onPress={() => navigation.goBack()}
      />
      <ScrollView>
        <View style={styles.wpEmployee}>
          <Text style={styles.txTitle}>Informasi Karyawan</Text>
          <View style={styles.wpInfo}>
            <Text style={styles.txHeadTitle}>Shift Kantor </Text>
            <Text style={styles.txInfo}>{data?.shift_name}</Text>
          </View>
          <View style={styles.wpInfo}>
            <Text style={styles.txHeadTitle}>Akun Email </Text>
            <Text style={styles.txInfo}>{data?.email}</Text>
          </View>
          <View style={styles.wpInfo}>
            <Text style={styles.txHeadTitle}>Tanggal Kehadiran</Text>
            <Text style={styles.txInfo}>{data?.attendance_date}</Text>
          </View>
          <View style={styles.wpInfo}>
            <Text style={styles.txHeadTitle}>Total Kerjaan</Text>
            <Text style={styles.txInfo}>{data?.total_work}</Text>
          </View>
          <View style={styles.wpInfo}>
            <Text style={styles.txHeadTitle}>Terlambat</Text>
            <Text style={styles.txInfo}>{data?.total_time_l}</Text>
          </View>
          <Gap height={20} />
          <Text style={styles.txTitle}>Informasi Kehadiran</Text>
          <Gap height={20} />
          {data?.list?.map((item, index) => (
            <View style={styles.wpList} key={index}>
              <View style={styles.wpListHead}>
                <Lightbox
                  navigator={navigation}
                  activeProps={{
                    style: {
                      width: 300,
                      height: 300,
                      borderRadius: 10,
                    },
                  }}>
                  <Image
                    source={{
                      uri: `https://kreasindocp.graphie.design/public/uploads/absen/${item?.image_in}`,
                    }}
                    style={styles.img}
                  />
                </Lightbox>

                <View>
                  <Text style={styles.txHeadTitle}>
                    Jarak : {item?.distance} m{' '}
                    {item?.out_of_range == 1 ? '(Diluar jarak)' : ''}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      Linking.openURL(
                        `https://www.google.com/maps/place/${item?.clock_in_latitude} ${item?.clock_in_longitude}`,
                      )
                    }>
                    <Text
                      style={[
                        styles.txHead,
                        {textDecorationLine: 'underline'},
                      ]}>
                      {item?.project_name}
                      {/* Location : {item?.clock_in_latitude}{' '}
                      {item?.clock_in_longitude} */}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.wpTime}>
                <View>
                  <Text style={styles.txHeadTitle}>Jam Masuk</Text>
                  <Text style={styles.txHead}>{item?.fclock_in}</Text>
                </View>
                <View>
                  <Text style={styles.txHeadTitle}>Jam Keluar</Text>
                  <Text style={styles.txHead}>{item?.fclock_out}</Text>
                </View>
                <View>
                  <Text style={styles.txHeadTitle}>Total</Text>
                  <Text style={styles.txHead}>{item?.total_work}</Text>
                </View>
              </View>
            </View>
          ))}
          <Gap height={20} />
          <Text style={styles.txTitle}>Informasi Lembur</Text>
          <Gap height={20} />
          {data?.overtime?.map((item, index) => (
            <View style={styles.wpList} key={index}>
              <View style={styles.wpListHead}>
                <View>
                  <Text style={[styles.txHead]}>{item?.project_name}</Text>
                </View>
              </View>
              <View style={styles.wpTime}>
                <View>
                  <Text style={styles.txHeadTitle}>Masuk Lembur</Text>
                  <Text style={styles.txHead}>
                    {moment(item?.clock_in).format('HH:mm A')}
                  </Text>
                </View>
                <View>
                  <Text style={styles.txHeadTitle}>Keluar Lembur</Text>
                  <Text style={styles.txHead}>
                    {moment(item?.clock_out).format('HH:mm') == '00:00'
                      ? '-'
                      : moment(item?.clock_out).format('HH:mm A')}
                  </Text>
                </View>
                <View>
                  <Text style={styles.txHeadTitle}>Total</Text>
                  <Text style={styles.txHead}>{item?.total_hours}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
        <Gap height={100} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyAttendanceDetailScreen;

const styles = StyleSheet.create({
  wpEmployee: {
    margin: 10,
  },
  txTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    color: '#DD4017',
  },
  wpInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#cfd1d1',
    marginVertical: 5,
  },
  txInfo: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#02275D',
  },
  txInfoTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#666',
  },
  wpList: {
    borderWidth: 1,
    borderColor: '#cfd1d1',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  wpListHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cfd1d1',
  },
  img: {
    width: 50,
    height: 50,
    objectFit: 'cover',
    borderRadius: 100 / 2,
  },
  txHead: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    color: '#02275D',
    textAlign: 'right',
  },
  txHeadTitle: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    color: '#666',
    textAlign: 'right',
  },
  wpTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
});
