const initGlobal = {
  isLoading: false,
  imageSelfie: {},
  projectId: 0,
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
  if (action.type === 'SET_PROJECT_ID') {
    return {
      ...state,
      projectId: action.value,
    };
  }
  return state;
};
