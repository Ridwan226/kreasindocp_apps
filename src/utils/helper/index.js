import {Text} from 'react-native';

export const formatGrid = (data, numColumns) => {
  const totalRows = Math.floor(data.length / numColumns);
  let totalLastRows = data.length - totalRows * numColumns;
  while (totalLastRows !== 0 && totalLastRows !== numColumns) {
    data.push({key: 'blank', empty: true});
    totalLastRows++;
  }
  return data;
};

export const statusText = data => {
  if (data == 1) {
    return 'In Progress';
  } else if (data == 2) {
    return 'Completed';
  } else if (data == 3) {
    return 'Cancelled';
  } else if (data == 4) {
    return 'On Hold';
  } else if (data == 0) {
    return 'Not Started';
  } else {
    return '';
  }
};
