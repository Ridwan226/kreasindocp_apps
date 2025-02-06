import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

const Icons = ({label, focuse}) => {
  switch (label) {
    case 'Home':
      return (
        <Entypo name="home" size={23} color={focuse ? '#FFF' : '#ACACAF'} />
      );
    case 'Task':
      return (
        <Entypo name="list" size={23} color={focuse ? '#FFF' : '#ACACAF'} />
      );
    default:
      return (
        <Entypo name="home" size={23} color={focuse ? '#FFF' : '#ACACAF'} />
      );
  }
};

const BottomTabNavigator = ({state, descriptors, navigation}) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.wpIcon}>
            <Icons label={label} focuse={isFocused} />
            <Text
              style={{
                color: isFocused ? '#FFF' : '#ACACAF',
                fontSize: 12,
                fontFamily: 'OpenSauceOne-Regular',
              }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#DD4017',
    paddingBottom: 7,
    paddingTop: 13,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  wpIcon: {flex: 1, alignItems: 'center'},
});
