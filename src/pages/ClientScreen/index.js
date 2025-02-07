import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CardClient, Gap, HeaderPrimary} from '../../component';
import {TextInput} from 'react-native-paper';

const ClientScreen = ({navigation}) => {
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
    {
      data: 'coba',
    },
    {
      data: 'coba',
    },
    {
      data: 'coba',
    },
    {
      data: 'coba',
    },
  ];
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
      <HeaderPrimary
        onPress={() => navigation.goBack()}
        title={'Manage Client'}
      />

      <TextInput
        label="Search Client"
        secureTextEntry
        right={<TextInput.Icon icon="account-search-outline" />}
      />
      <Gap height={10} />
      <FlatList
        data={dataList}
        renderItem={({item}) => <CardClient item={item} />}
        numColumns={1}
        ListFooterComponent={<View style={{margin: 100}} />}
      />
      {/* <CardClient />
      <CardClient />
      <CardClient />
      <CardClient /> */}
    </SafeAreaView>
  );
};

export default ClientScreen;

const styles = StyleSheet.create({});
