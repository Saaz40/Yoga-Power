import AsyncStorage from '@react-native-async-storage/async-storage';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {persistReducer} from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';
import {thunk} from 'redux-thunk';
import {LangReducer} from './reducer';

const persistStorageConfig = {
  key: 'YogaPower',
  storage: AsyncStorage,
};

const RootReducer = combineReducers({
  langauge: LangReducer,
});

const peristedReducer = persistReducer(persistStorageConfig, RootReducer);

export default store = createStore(peristedReducer, applyMiddleware(thunk));

export const persistor = persistStore(store);
