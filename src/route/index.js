import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {
  ClientScreen,
  ForgotPasswordScreen,
  HomeScreen,
  InformationDetailScreen,
  InformationScreen,
  LoginScreen,
  LogItemTaskScreen,
  MyAttendanceDetailScreen,
  MyAttendanceScreen,
  ProjectAddScreen,
  ProjectScreen,
  RequestMenuScreen,
  SplashScreen,
  TakeSelfieScreen,
  TaskDetailScreen,
  TasksAddScreen,
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
      {/* <Tab.Screen
        name="Information"
        component={InformationScreen}
        options={{headerShown: false}}
      /> */}
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
      {/* <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
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
      <Stack.Screen
        name="RequestMenuScreen"
        component={RequestMenuScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TasksAddScreen"
        component={TasksAddScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TaskDetailScreen"
        component={TaskDetailScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProjectAddScreen"
        component={ProjectAddScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="InformationDetailScreen"
        component={InformationDetailScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LogItemTaskScreen"
        component={LogItemTaskScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
