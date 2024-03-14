import { IDataOperatorModel } from '@/core/services/domain/model/region.model';
import { atom, useAtom } from 'jotai';

interface QuotaItem {
  id: number;
  value_mb: number;
  price: number;
  total_count: number;
  total_price: number;
}

export interface IStoreDatas {
  operator?: IDataOperatorModel;
  quota?: QuotaItem[];
  total_price?: number;
}

const value: IStoreDatas = {};
const store = atom(value);

const useStoreDatas = () => useAtom(store);

export default useStoreDatas;
