import { atom, useAtom } from 'jotai';

const store = atom({
  _id: '',
  name: '',
});

const useForm = () => useAtom(store);

export default useForm;
