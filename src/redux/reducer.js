const initialLanguageState = {
  language: 'english', // Default language
};

export const LangReducer = (state = initialLanguageState, action) => {
  switch (action.type) {
    case 'SET_LANGUAGE':
      console.log('Reducer received SET_LANGUAGE action:', action.payload);
      return {
        ...state,
        language: action.payload,
      };
    default:
      console.log('Reducer received unknown action:', action.type);
      return state;
  }
};
