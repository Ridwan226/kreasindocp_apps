import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Provider, useSelector} from 'react-redux';
import store from './redux/store';
import Router from './route';
import Toast from 'react-native-toast-message';
import {LoadingPrimary} from './component';
import {MenuProvider} from 'react-native-popup-menu';
const MainApp = () => {
  const {isLoading} = useSelector(state => state.globalReducer);
  return (
    <NavigationContainer>
      <Router />
      <Toast />
      {isLoading && <LoadingPrimary />}
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <MenuProvider>
        <MainApp />
      </MenuProvider>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
