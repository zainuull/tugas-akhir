import { IDataParticipant } from '@/core/services/domain/model/IParticipant';
import { atom, useAtom } from 'jotai';


const value: IDataParticipant = {};
const store = atom(value);

const useStoreDatas = () => useAtom(store);

export default useStoreDatas;
