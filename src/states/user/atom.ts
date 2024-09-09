import { atom } from 'recoil';

export const userOnlineState = atom<number[]>({
  key: 'userOnlineState',
  default: []
});
