import { atom, useAtom } from 'jotai';
import { IDataParticipant } from '../../domain/model/model';

const value: IDataParticipant = {};
const store = atom(value);

const useStoreDatas = () => useAtom(store);

export default useStoreDatas;
