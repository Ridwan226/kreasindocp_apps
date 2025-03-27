import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  PermissionsAndroid,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CardTasks, Gap, HeaderPrimary, LocationProject} from '../../component';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Button} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {gettaskData} from '../../redux/action/task';
import {useFocusEffect} from '@react-navigation/native';
import {getShiftData} from '../../redux/action/shift';
import Geolocation from 'react-native-geolocation-service';

const TaskScreen = ({navigation}) => {
  const [status, setStatus] = useState('semua');
  const [data, setData] = useState([]);
  const [dataShift, setDataShift] = useState({});
  const dispatch = useDispatch();
  const [location, setLocation] = useState(false);

  useFocusEffect(
    useCallback(() => {
      getData();
      getDataShift();
    }, [status, location]),
  );

  useEffect(() => {
    getLocation();
  }, []);
  const getDataShift = () => {
    let form = new FormData();
    form.append(
      'latitude',
      location?.coords?.latitude ? location?.coords?.latitude : 1,
    );
    form.append(
      'longitude',
      location?.coords?.longitude ? location?.coords?.longitude : 1,
    );
    dispatch(getShiftData(setDataShift, form));
  };

  const getData = () => {
    let form = new FormData();
    form.append('status', status);
    dispatch(gettaskData(form, setData));
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === 'granted') {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  };

  const getLocation = () => {
    const result = requestLocationPermission();
    result.then(res => {
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            setLocation(position);
          },
          error => {
            // See error code charts below.
            setLocation(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
      <HeaderPrimary
        onPress={() => navigation.goBack()}
        title="My Tasks"
        // onPressIcon={() => navigation.push('TasksAddScreen')}
        // iconName={'plus'}
      />
      {dataShift?.projects?.length > 0 && (
        <View style={{zIndex: 20}}>
          <LocationProject data={dataShift?.projects} task={true} />
        </View>
      )}

      <Gap height={10} />
      <View style={styles.wpList}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <Button
            mode="outlined"
            style={styles.wpButtonStatus(status === 'semua' ? true : false)}
            labelStyle={styles.txButtonStatus(
              status === 'semua' ? true : false,
            )}
            onPress={() => setStatus('semua')}>
            Semua
          </Button>
          <Button
            mode="outlined"
            style={styles.wpButtonStatus(status == 1 ? true : false)}
            labelStyle={styles.txButtonStatus(status == 1 ? true : false)}
            onPress={() => setStatus(1)}>
            In Progress
          </Button>
          <Button
            mode="outlined"
            style={styles.wpButtonStatus(status == 2 ? true : false)}
            labelStyle={styles.txButtonStatus(status == 2 ? true : false)}
            onPress={() => setStatus(2)}>
            Completed
          </Button>
          <Button
            mode="outlined"
            style={styles.wpButtonStatus(status == 4 ? true : false)}
            labelStyle={styles.txButtonStatus(status == 4 ? true : false)}
            onPress={() => setStatus(4)}>
            On Hold
          </Button>
          <Button
            mode="outlined"
            style={styles.wpButtonStatus(status == 3 ? true : false)}
            labelStyle={styles.txButtonStatus(status == 3 ? true : false)}
            onPress={() => setStatus(3)}>
            Cancelled
          </Button>
          <Button
            mode="outlined"
            style={styles.wpButtonStatus(status === 0 ? true : false)}
            labelStyle={styles.txButtonStatus(status === 0 ? true : false)}
            onPress={() => setStatus(0)}>
            Not Started
          </Button>
        </ScrollView>
      </View>
      <Gap height={10} />
      <View style={{flex: 1, marginHorizontal: 10}}>
        {data?.length > 0 ? (
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => <CardTasks item={item} />}
            numColumns={1}
            ListFooterComponent={<View style={{margin: 100}} />}
          />
        ) : (
          <View>
            <Text>Data Not Found</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default TaskScreen;

const styles = StyleSheet.create({
  wpList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    flexWrap: 'wrap',
    alignItems: 'center',
    marginHorizontal: 0,
    // paddingBottom: 200,
  },
  wpButtonStatus: status => ({
    marginRight: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: status ? '#DD4017' : '#DDDDDD',
  }),
  txButtonStatus: status => ({
    color: status ? '#DD4017' : '#DDDDDD',
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
  }),
});
