import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {HeaderPrimary, ListInfo} from '../../component';

const InformationDetailScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
      <HeaderPrimary
        title="Information Detail"
        onPress={() => navigation.goBack()}
      />
      <ScrollView style={{flex: 1, padding: 15}}>
        <ListInfo title="Title" icon="list" desc="Description" type="list" />
        <ListInfo
          title="Start Date"
          icon="calendar-alt"
          desc="Description"
          type="list"
        />
        <ListInfo
          title="End Date"
          icon="calendar-alt"
          desc="Description"
          type="list"
        />
        <ListInfo
          title="Created at"
          icon="calendar-alt"
          desc="Description"
          type="list"
        />
        <ListInfo
          title="Created at"
          icon="city"
          desc="Description DescriptionDescription Description Description"
          type="list"
        />

        <ListInfo
          title="Created at"
          icon="city"
          desc="Description DescriptionDescription Description Description"
          type="detail"
        />
        <ListInfo
          title="Description"
          icon="city"
          desc="Description DescriptionDescription Description Description"
          type="detail"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default InformationDetailScreen;

const styles = StyleSheet.create({});
