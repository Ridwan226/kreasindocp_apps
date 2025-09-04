import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {Appbar, Icon} from 'react-native-paper';
const HeaderPrimary = ({onPress, onPressIcon, title, iconName = 'bell'}) => {
  return (
    // <Appbar.Header mode="small" style={styles.container}>
    //   {onPress && <Appbar.BackAction color="#fff" onPress={onPress} />}
    //   <Appbar.Content color="#fff" titleStyle={styles.text} title={title} />
    //   {onPressIcon && (
    //     <Appbar.Action
    //       style={styles.icon}
    //       icon={iconName}
    //       onPress={onPressIcon}
    //       color="#fff"
    //     />
    //   )}
    // </Appbar.Header>
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {onPress && (
          <TouchableOpacity>
            <Entypo
              name="chevron-left"
              size={30}
              onPress={onPress}
              color="#fff"
            />
          </TouchableOpacity>
        )}

        <Text style={styles.text}>{title}</Text>
      </View>
      {onPressIcon && (
        <TouchableOpacity>
          <Entypo
            name={iconName}
            size={24}
            onPress={onPressIcon}
            color="#fff"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default HeaderPrimary;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DD4017',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  text: {
    fontSize: 15,
    fontFamily: 'Poppins-Bold',
    color: '#fff',
  },
});
