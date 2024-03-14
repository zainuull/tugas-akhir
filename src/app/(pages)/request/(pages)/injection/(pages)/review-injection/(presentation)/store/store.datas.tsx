import { atom, useAtom } from 'jotai';
import { IRequestInjectionDataModel } from '../../../../domain/model/model';

const value: IRequestInjectionDataModel = {};
const store = atom(value);

const useStoreDatas = () => useAtom(store);

export default useStoreDatas;
