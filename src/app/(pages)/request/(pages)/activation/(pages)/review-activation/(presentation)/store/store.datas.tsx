import { atom, useAtom } from 'jotai';
import { IRequestActivationDataModel } from '../../../../domain/model/model';

const value: IRequestActivationDataModel = {};
const store = atom(value);

const useStoreDatas = () => useAtom(store);

export default useStoreDatas;
