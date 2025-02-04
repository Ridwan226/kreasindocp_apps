import Toast from 'react-native-toast-message';
import {t} from 'i18next';

export const showMessage = (message, type, onPress, visibilityTime = 4000) => {
  Toast.show({
    type: type === 'success' ? 'success' : 'error',
    text1: message,
    text2: type === 'success' ? 'Success 👏🏻' : t(''),
    onPress: onPress ? onPress : null,
    visibilityTime: visibilityTime,
  });
};
