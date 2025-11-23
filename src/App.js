import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Provider, useSelector} from 'react-redux';
import store from './redux/store';
import Router from './route';
import Toast from 'react-native-toast-message';
import {ConnectionStatus, LoadingPrimary, NoInternet} from './component';
import {MenuProvider} from 'react-native-popup-menu';
import {SafeAreaProvider} from 'react-native-safe-area-context';
const MainApp = () => {
  const {isLoading, isConnectedInternet} = useSelector(
    state => state.globalReducer,
  );
  return (
    <NavigationContainer>
      <Router />
      <ConnectionStatus />
      <Toast />
      {isLoading && <LoadingPrimary />}
      {isConnectedInternet && <NoInternet />}
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <MenuProvider>
          <MainApp />
        </MenuProvider>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
