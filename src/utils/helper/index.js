export const formatGrid = (data, numColumns) => {
  const totalRows = Math.floor(data.length / numColumns);
  let totalLastRows = data.length - totalRows * numColumns;
  while (totalLastRows !== 0 && totalLastRows !== numColumns) {
    data.push({key: 'blank', empty: true});
    totalLastRows++;
  }
  return data;
};
