import {
  atom,
  DefaultValue,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';

import AsyncStorage from '@react-native-async-storage/async-storage';

const persistAtom = key => {
  return ({setSelf, onSet}) => {
    setSelf(
      AsyncStorage.getItem(key).then(savedValue =>
        savedValue != null ? JSON.parse(savedValue) : new DefaultValue(),
      ),
    );

    onSet(newValue => {
      if (newValue instanceof DefaultValue) {
        AsyncStorage.removeItem(key);
      } else {
        AsyncStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };
};

const todoListState = atom({
  key: 'TodoList',
  default: ['google.com'],
  effects_UNSTABLE: [persistAtom('listURL')],
});

export const useListState = () => {
  return useRecoilState(todoListState);
};

export const useListValue = () => {
  return useRecoilValue(todoListState);
};

export const useSetList = () => {
  return useSetRecoilState(todoListState);
};

export const useReset = () => {
  return useResetRecoilState(todoListState);
};
