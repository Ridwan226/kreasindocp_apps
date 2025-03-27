import React, {useState} from 'react';
import {
  Appearance,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Select2 from 'react-native-select-two';
import InputScrollView from 'react-native-input-scroll-view';
import {TextInput} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Gap, HeaderPrimary} from '../../component';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';

const ProjectAddScreen = ({navigation}) => {
  const [firstDate, setFirstDate] = useState(
    moment(lastDate).subtract(6, 'days').toDate(),
  );
  const [lastDate, setLastDate] = useState(new Date());
  const [firstOpen, setFirstOpen] = useState(false);
  const [lastOpen, setLastOpen] = useState(false);

  const mockData = [
    {id: 1, name: 'React Native Developer', checked: true}, // set default checked for render option item
    {id: 2, name: 'Android Developer'},
    {id: 3, name: 'iOS Developer'},
  ];
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
      <HeaderPrimary
        onPress={() => navigation.goBack()}
        title="Add New Project"
        iconName="content-save-all-outline"
        onPressIcon={() => {}}
      />

      <InputScrollView style={styles.wpForm}>
        <TextInput
          mode="outlined"
          label="Outlined input *"
          placeholder="Type something"
        />
        <Gap height={20} />
        <View>
          <Text>Start Date</Text>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              setFirstOpen(true);
            }}>
            <View style={styles.selectDate}>
              <Text style={styles.textSelectDate}>
                {moment(firstDate).format('DD/MM/YYYY')}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <Gap height={10} />
        <View>
          <Text>End Date</Text>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              setLastOpen(true);
            }}>
            <View style={styles.selectDate}>
              <Text style={styles.textSelectDate}>
                {moment(lastDate).format('DD/MM/YYYY')}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <Gap height={10} />
        <TextInput
          mode="outlined"
          label="Estimated Hour "
          placeholder="Estimated Hour"
          type="number"
          keyboardType="numeric"
        />
        <Gap height={20} />
        <View>
          <Text>Select Client</Text>
          <View style={styles.container}>
            <Select2
              isSelectSingle
              style={{borderRadius: 5}}
              colorTheme="blue"
              popupTitle="Select item"
              title="Select item"
              data={mockData}
              onSelect={data => {}}
              onRemoveItem={data => {}}
              selectButtonText={'Done'}
              cancelButtonText={'Cencel'}
              searchPlaceHolderText="Search Item"
            />
          </View>
        </View>
        <Gap height={20} />
        <View>
          <Text>Priority</Text>
          <View style={styles.container}>
            <Select2
              isSelectSingle
              style={{borderRadius: 5}}
              colorTheme="blue"
              popupTitle="Select item"
              title="Select item"
              data={mockData}
              onSelect={data => {}}
              onRemoveItem={data => {}}
              selectButtonText={'Done'}
              cancelButtonText={'Cencel'}
              searchPlaceHolderText="Search Item"
            />
          </View>
        </View>
        <Gap height={20} />
        <View>
          <Text>Team</Text>
          <View style={styles.container}>
            <Select2
              // isSelectSingle
              style={{borderRadius: 5}}
              colorTheme="blue"
              popupTitle="Select item"
              title="Select item"
              data={mockData}
              onSelect={data => {}}
              onRemoveItem={data => {}}
              selectButtonText={'Done'}
              cancelButtonText={'Cencel'}
              searchPlaceHolderText="Search Item"
            />
          </View>
        </View>
        <Gap height={20} />
        <TextInput
          mode="outlined"
          label="Summary * "
          placeholder="Summary *"
          type="number"
          keyboardType="numeric"
        />
        <Gap height={20} />
        <TextInput
          mode="outlined"
          label="Task Description"
          placeholder="Enter task description"
          multiline
          numberOfLines={4}
          style={styles.textArea}
        />
      </InputScrollView>

      <Text>Start Date</Text>
      <DatePicker
        modal
        mode={'date'}
        open={firstOpen}
        date={firstDate}
        onConfirm={date => {
          setFirstDate(date);
          setFirstOpen(false);
        }}
        // maximumDate={new Date()}
        onCancel={() => setFirstOpen(false)}
        textColor={Appearance.getColorScheme() === 'dark' ? '#fff' : '#000'}
        backgroundColor={'#fff'}
      />
    </SafeAreaView>
  );
};

export default ProjectAddScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  wpForm: {
    flex: 1,
    margin: 10,
  },
  selectDate: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#242424',
    borderRadius: 10,
    width: '100%',
  },
  textSelectDate: {
    fontSize: 13,
    color: '#7B7B7B',
    fontFamily: 'Poppins-Regular',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
