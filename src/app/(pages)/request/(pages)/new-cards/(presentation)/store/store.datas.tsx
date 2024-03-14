import { atom, useAtom } from 'jotai';
import { IRequestCreditDataModel } from '../../domain/model/model';

const value: IRequestCreditDataModel = {};
const store = atom(value);

const useStoreDatas = () => useAtom(store);

export default useStoreDatas;
