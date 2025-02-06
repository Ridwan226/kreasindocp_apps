import React from 'react';
import {StyleSheet} from 'react-native';
import {Appbar} from 'react-native-paper';
const HeaderPrimary = ({onPress, onPressIcon, title}) => {
  return (
    <Appbar.Header mode="small" style={styles.container}>
      {onPress && <Appbar.BackAction color="#fff" onPress={onPress} />}
      <Appbar.Content color="#fff" titleStyle={styles.text} title={title} />
      {onPressIcon && (
        <Appbar.Action
          style={styles.icon}
          icon="bell"
          onPress={onPressIcon}
          color="#fff"
        />
      )}
    </Appbar.Header>
  );
};

export default HeaderPrimary;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DD4017',
  },
  text: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    color: '#fff',
  },
});
