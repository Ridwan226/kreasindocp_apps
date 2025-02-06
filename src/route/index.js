import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {
  ClientScreen,
  HomeScreen,
  InformationScreen,
  LoginScreen,
  MyAttendanceDetailScreen,
  MyAttendanceScreen,
  ProjectScreen,
  SplashScreen,
  TakeSelfieScreen,
  TaskScreen,
} from '../pages';
import {BottomTabNavigator} from '../component';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator tabBar={props => <BottomTabNavigator {...props} />}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Information"
        component={InformationScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TakeSelfieScreen"
        component={TakeSelfieScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyAttendanceScreen"
        component={MyAttendanceScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyAttendanceDetailScreen"
        component={MyAttendanceDetailScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TaskScreen"
        component={TaskScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProjectScreen"
        component={ProjectScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ClientScreen"
        component={ClientScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
