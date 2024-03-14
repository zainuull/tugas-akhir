import { atom, useAtom } from 'jotai';
import { IStatusModel } from '../../domain/model/model';


const value: IStatusModel = {};
const store = atom(value);

const useStoreDatas = () => useAtom(store);

export default useStoreDatas;
