import {combineReducers} from 'redux';
import {globalReducer} from './global';

const reducer = combineReducers({globalReducer});

// export default reducer;

// export default reducer;
const rootReducer = (state, action) => {
  // Clear all data in redux store to initial.
  if (action.type === 'DESTROY_SESSION') state = undefined;

  return reducer(state, action);
};

export default rootReducer;
