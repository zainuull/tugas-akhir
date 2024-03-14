import { IDataOperatorModel } from '@/core/services/domain/model/region.model';
import { Upload } from './upload';

interface IUploadExcel {
  operator: IDataOperatorModel;
  setData: Function;
}

const UploadExcel = (props: IUploadExcel) => {
  const { operator, setData } = props;

  return (
    <div className="w-full min-h-40 bg-white rounded-lg flex flex-col gap-y-3 items-center p-4">
      <h1 className={`${!operator.id && 'text-gray-400'}`}>Upload Card List from File</h1>
      {operator.id ? (
        <Upload setData={setData} />
      ) : (
        <p className="w-full h-full text-center text-xl text-gray-400 my-20">
          Choose your operator{' '}
        </p>
      )}
    </div>
  );
};

export default UploadExcel;
