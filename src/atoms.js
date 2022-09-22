import {
  atom,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';

const todoListState = atom({
  key: 'TodoList',
  default: ['google.com'],
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
