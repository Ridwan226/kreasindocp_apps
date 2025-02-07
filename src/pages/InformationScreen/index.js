import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Avatar, Card, IconButton} from 'react-native-paper';
import {HeaderPrimary} from '../../component';

const InformationScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
      <HeaderPrimary title="Information" />
      <Card.Title
        title="Card Title"
        subtitle="Card Subtitle"
        left={props => (
          <Avatar.Icon {...props} icon="bell" backgroundColor="#DD4017" />
        )}
        right={props => (
          <IconButton
            {...props}
            icon="arrow-right"
            onPress={() => navigation.push('InformationDetailScreen')}
          />
        )}
      />
      <Card.Title
        title="Card Title"
        subtitle="Card Subtitle"
        left={props => (
          <Avatar.Icon {...props} icon="bell" backgroundColor="#DD4017" />
        )}
        right={props => (
          <IconButton {...props} icon="arrow-right" onPress={() => {}} />
        )}
      />
      <Card.Title
        title="Card Title"
        subtitle="Card Subtitle"
        left={props => (
          <Avatar.Icon {...props} icon="bell" backgroundColor="#DD4017" />
        )}
        right={props => (
          <IconButton {...props} icon="arrow-right" onPress={() => {}} />
        )}
      />
      <Card.Title
        title="Card Title"
        subtitle="Card Subtitle"
        left={props => (
          <Avatar.Icon {...props} icon="bell" backgroundColor="#DD4017" />
        )}
        right={props => (
          <IconButton {...props} icon="arrow-right" onPress={() => {}} />
        )}
      />
    </SafeAreaView>
  );
};

export default InformationScreen;

const styles = StyleSheet.create({});
