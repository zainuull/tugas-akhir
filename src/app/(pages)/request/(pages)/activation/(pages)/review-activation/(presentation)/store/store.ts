import { atom, useAtom } from 'jotai';

const store = atom({
  _id: '',
  operator: '',
  file: '',
  end_user: 0,
  end_user_name: '',
  region: 0,
  region_name: '',
});

const useValue = () => useAtom(store);

export default useValue;
