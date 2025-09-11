import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Gap, HeaderPrimary} from '../../component';
import MonthPicker from 'react-native-month-year-picker';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {viewDataMyAttendance} from '../../redux/action/shift';
import {showMessage} from '../../utils';

const MyAttendanceScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dateList, setDateList] = useState([]);

  const showPicker = useCallback(value => setShow(value), []);
  const onValueChange = useCallback(
    (event, newDate) => {
      const selectedDate = newDate || date;

      showPicker(false);
      setDate(selectedDate);
    },
    [date, showPicker],
  );

  useEffect(() => {
    getData();
  }, [date]);

  const getData = () => {
    let form = new FormData();
    form.append('time', moment(date, 'MM-YYYY').format('YYYY-MM'));
    dispatch(viewDataMyAttendance(form, setDateList));
  };

  return (
    <SafeAreaView style={styles.page}>
      <HeaderPrimary
        onPress={() => navigation.goBack()}
        title="Riwayat Kehadiran"
      />
      <TouchableOpacity onPress={() => showPicker(true)} style={styles.btnDate}>
        <Text>Berdasarkan : {moment(date, 'MM-YYYY').format('MMM YYYY')}</Text>
      </TouchableOpacity>
      <ScrollView style={{flex: 1, backgroundColor: '#F3F3F3'}}>
        {dateList?.map((item, index) => {
          return (
            <TouchableOpacity
              style={styles.wpDate}
              key={index}
              onPress={() =>
                item?.clock_in
                  ? navigation.push('MyAttendanceDetailScreen', {
                      item: item,
                    })
                  : showMessage('Data Tidak Tersedia')
              }
              activeOpacity={0.8}>
              <View>
                <View style={styles.wpDateHead}>
                  <Text style={styles.txDate}>
                    {moment(item?.attendance_date).format('DD MMM YYYY')}
                  </Text>

                  {item?.clock_in ? null : (
                    <Text style={styles.txStatus}>{item?.status}</Text>
                  )}
                </View>

                <Gap height={10} />
                <View style={styles.wpItem}>
                  <Text style={styles.txLokasi}>Absen Masuk</Text>
                  <Text style={styles.txAddress}>
                    {' '}
                    {item?.clock_in
                      ? moment(item?.clock_in).format('HH:mm')
                      : '-'}{' '}
                  </Text>
                </View>
                <View style={styles.wpItem}>
                  <Text style={styles.txLokasi}>Absen Keluar</Text>
                  <Text style={styles.txAddress}>
                    {' '}
                    {item?.clock_out
                      ? moment(item?.clock_out).format('HH:mm')
                      : '-'}{' '}
                  </Text>
                </View>
                <View style={styles.wpItem}>
                  <Text style={styles.txLokasi}>Mulai Lembur</Text>
                  <Text style={styles.txAddress}>
                    {' '}
                    {item?.overtime_in
                      ? moment(item?.overtime_in).format('HH:mm')
                      : '-'}{' '}
                  </Text>
                </View>
                <View style={styles.wpItem}>
                  <Text style={styles.txLokasi}>Selesai Lembur</Text>
                  <Text style={styles.txAddress}>
                    {' '}
                    {item?.overtime_out
                      ? moment(item?.overtime_out).format('HH:mm') == '00:00'
                        ? '-'
                        : moment(item?.overtime_out).format('HH:mm')
                      : '-'}
                    {/* {moment(item?.overtime_out).format('HH:mm') == '00:00'
                      ? '-'
                      : moment(item?.overtime_out).format('HH:mm')} */}
                  </Text>
                </View>
              </View>
              {/* <View>
                {item?.clock_in ? (
                  <Text style={styles.txTime}>
                    Jam Masuk {moment(item?.clock_in).format('hh:mm A')}
                  </Text>
                ) : null}
                {item?.clock_out ? (
                  <Text style={styles.txTime}>
                    Jam Keluar {moment(item?.clock_out).format('hh:mm A')}
                  </Text>
                ) : null}
              </View> */}
            </TouchableOpacity>
          );
        })}

        <Gap height={100} />
      </ScrollView>

      {show && (
        <MonthPicker
          onChange={onValueChange}
          value={date}
          // minimumDate={new Date()}
          maximumDate={new Date(2050, 5)}
          locale="id"
        />
      )}
    </SafeAreaView>
  );
};

export default MyAttendanceScreen;

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
    flex: 1,
  },
  btnDate: {
    margin: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  wpDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: '#CFCFCF',
    backgroundColor: '#FFF',
  },
  wpDateHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#CFCFCF',
    paddingBottom: 10,
  },
  txDate: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    color: '#535353',
  },
  txLokasi: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    color: '#959595',
  },
  txAddress: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: '#4E4E4E',
    textAlign: 'right',
  },
  txStatus: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 17,
    color: '#02275D',
    textAlign: 'right',
  },
  txTime: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    color: '#02275D',
  },

  wpItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
});
