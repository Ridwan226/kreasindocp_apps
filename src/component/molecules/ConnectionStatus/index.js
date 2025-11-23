import NetInfo from '@react-native-community/netinfo';
import {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';

const ConnectionStatus = ({navigation}) => {
  const dispatch = useDispatch();
  const {isConnectedInternet} = useSelector(state => state.globalReducer);
  const [isWeakConnection, setIsWeakConnection] = useState(false);
  const [show, setShow] = useState(false);
  const [isConnectedInternal, setIsConnectedInternal] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      // if (state.isConnected === true && state.details.linkSpeed < 40) {
      //    setShow(true);
      //    setIsConnectedInternal(state.isConnected)
      //    setIsWeakConnection(true)
      //    dispatch({type: 'SET_IS_CONNECTED', value: false});
      //    return;
      // }
      if (
        state.isConnected === true &&
        state.details.cellularGeneration === '2g'
      ) {
        // setShow(true);
        setIsConnectedInternal(state.isConnected);
        setIsWeakConnection(true);
        dispatch({type: 'SET_IS_CONNECTED', value: false});
        return;
      }
      if (state.isConnected === false) {
        // setShow(true);
        setIsWeakConnection(false);
        setIsConnectedInternal(state.isConnected);
        dispatch({type: 'SET_IS_CONNECTED', value: true});
        return;
      }
      if (isConnectedInternet === true) {
        if (state.isConnected === true) {
          setIsWeakConnection(false);
          setShow(true);
          setTimeout(() => {
            setShow(false);
          }, 3000);
          setIsConnectedInternal(state.isConnected);
          dispatch({type: 'SET_IS_CONNECTED', value: false});
          return;
        }
      }
    });
    return () => {
      unsubscribe();
    };
  }, [isConnectedInternal, isConnectedInternet]);

  // useEffect(() => {
  //   if (isConnectedInternal === true && isWeakConnection === false) {
  //     setTimeout(() => {
  //       setShow(false);
  //     }, 3000);
  //   }
  // }, [isConnectedInternal]);

  const conditionInternet = () => {
    if (isConnectedInternal && isWeakConnection) {
      return 'Koneksi Internet Lemah';
    }
    if (isConnectedInternal) {
      return 'Online';
    }
    if (!isConnectedInternal) {
      return 'Koneksi Terputus';
    }
  };

  return (
    <>
      {show && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            height: RFValue(24),
            borderBottomLeftRadius: RFValue(12),
            borderBottomRightRadius: RFValue(12),
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: isWeakConnection
              ? '#FEC868'
              : isConnectedInternal
              ? 'green'
              : '#DD4017',
          }}>
          <Text style={styles.text}>{conditionInternet()}</Text>
        </View>
      )}
    </>
  );
};

export default ConnectionStatus;

const styles = StyleSheet.create({
  text: {
    fontSize: RFValue(11),
    fontFamily: 'Poppins-Medium',
    color: '#fff',
  },
});
