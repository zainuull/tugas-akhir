import { IUserDataModel } from '@/app/(auth)/login/domain/model/model';
import { IUserModel } from '@/core/interface/IUser';
import { atom, useAtom } from 'jotai';

const data: IUserModel = {};
const store = atom(data);

const useUser = () => useAtom(store);

export default useUser;
