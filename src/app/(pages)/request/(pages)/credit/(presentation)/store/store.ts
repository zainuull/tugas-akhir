import { atom, useAtom } from 'jotai';

const store = atom({
  _id: '',
  name: '',
  operator: '',
});

const useForm = () => useAtom(store);

export default useForm;
