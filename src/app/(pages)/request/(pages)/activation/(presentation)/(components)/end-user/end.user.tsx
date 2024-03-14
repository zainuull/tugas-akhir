import { IDataEndUserModel, IDataRegionModel } from '@/core/services/domain/model/region.model';
import { IDataRequestActivationModel } from '../../../domain/model/model';
import SetEndUserDropdown from '@/app/(sharedComponents)/dropdown/set.end.user.dropdown';
import SetRegionDropdown from '@/app/(sharedComponents)/dropdown/set.region.dropdown';

interface IEndUser {
  data: IDataRequestActivationModel[];
  endUser: IDataEndUserModel;
  setEndUser: Function;
  region: IDataRegionModel;
  setRegion: Function;
}

const EndUser = (props: IEndUser) => {
  const { data, endUser, setEndUser, region, setRegion } = props;
  return (
    <div className="w-full min-h-40 bg-white rounded-lg flex justify-between gap-y-3 items-center p-4">
      {data.length ? (
        <>
          <SetEndUserDropdown value={endUser} setValue={setEndUser} />
          <SetRegionDropdown value={region} setValue={setRegion} />
        </>
      ) : (
        <p className="w-full h-full text-center text-xl text-gray-400 my-20">
          Upload your data excel{' '}
        </p>
      )}
    </div>
  );
};
export default EndUser;
