import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CardTasks, HeaderPrimary} from '../../component';
import {formatGrid} from '../../utils';

const TaskScreen = ({navigation}) => {
  let dataList = [
    {
      data: 'oke',
    },
    {
      data: 'test',
    },
    {
      data: 'coba',
    },
  ];

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
      <HeaderPrimary
        onPress={() => navigation.goBack()}
        title="Tasks"
        onPressIcon={() => {}}
      />
      <View style={styles.wpList}>
        <FlatList
          data={dataList}
          renderItem={({item}) => <CardTasks item={item} />}
          numColumns={1}
          ListFooterComponent={<View style={{margin: 100}} />}
        />
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
});
