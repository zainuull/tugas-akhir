import { IEndUserModel, IOperatorModel, IRegionModel } from '../model/region.model';

export interface Repository {
  getOperator(): Promise<IOperatorModel>;
  getRegion(): Promise<IRegionModel>;
  getEndUser(): Promise<IEndUserModel>;
  getRole(): Promise<IRegionModel>;
}
