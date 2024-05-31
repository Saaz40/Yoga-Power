export const setLanguage = language => {
  console.log('Dispatching SET_LANGUAGE action with language:', language);
  return {
    type: 'SET_LANGUAGE',
    payload: language,
  };
};
