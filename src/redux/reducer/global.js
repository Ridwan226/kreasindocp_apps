const initGlobal = {
  isLoading: false,
  imageSelfie: {},
};

export const globalReducer = (state = initGlobal, action) => {
  if (action.type === 'SET_LOADING') {
    return {
      ...state,
      isLoading: action.value,
    };
  }
  if (action.type === 'SET_IMAGE_SELFIE') {
    return {
      ...state,
      imageSelfie: action.value,
    };
  }
  return state;
};
