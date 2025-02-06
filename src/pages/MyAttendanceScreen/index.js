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
  console.log('date', moment(date, 'MM-YYYY').format('YYYY-MM'));

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
        title="My Attendance"
      />
      <TouchableOpacity onPress={() => showPicker(true)} style={styles.btnDate}>
        <Text>Berdasarkan : {moment(date, 'MM-YYYY').format('MMM YYYY')}</Text>
      </TouchableOpacity>
      <ScrollView>
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
                  : showMessage('data Not Found')
              }
              activeOpacity={0.8}>
              <View>
                <Text style={styles.txDate}>
                  {moment(item?.attendance_date).format('dddd, DD MMM YYYY')}
                </Text>
                {item?.status ? (
                  <Text style={styles.txStatus}>{item?.status}</Text>
                ) : null}
              </View>
              <View>
                {item?.clock_in ? (
                  <Text style={styles.txTime}>
                    Jam Masuk {moment(item?.clock_in).format('HH:MM A')}
                  </Text>
                ) : null}
                {item?.clock_out ? (
                  <Text style={styles.txTime}>
                    Jam Keluar {moment(item?.clock_out).format('HH:MM A')}
                  </Text>
                ) : null}
              </View>
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
          maximumDate={new Date(2025, 5)}
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
    borderColor: '#02275D',
  },
  txDate: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#02275D',
  },
  txStatus: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#02275D',
    backgroundColor: '#DDEDEA',
    padding: 5,
    borderRadius: 5,
    textAlign: 'center',
    maxWidth: 130,
  },
  txTime: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#02275D',
  },
});
