'use client';
import { IDataOperatorModel } from '@/core/services/domain/model/region.model';
import { mockData } from '../../data/mock';
import { IRequestCreditDataModel } from '../../domain/model/model';
import UploadPayment from './upload-payment/upload.payment';

interface IRemaningCredits {
  operator: IDataOperatorModel;
  role: string;
  uploadFile: File[];
  setUploadFile: Function;
  dataRemainingCredit: IRequestCreditDataModel[];
}

const RemainingCredits = (props: IRemaningCredits) => {
  const { operator, role, uploadFile, setUploadFile, dataRemainingCredit } = props;
  const colors = ['#6B0908', '#9D0106', '#D00000', '#E85D04'];

  return (
    <div className="w-full xl:w-[45%] min-h-40 flex flex-col gap-y-4">
      <div className="w-full flex flex-col bg-white gap-y-3 p-4 rounded-lg">
        <div className="w-full flex items-center justify-between">
          <h1 className="font-semibold text-primary">Remaining Credits</h1>
          <p className="text-gray-400">{operator.name}</p>
        </div>
        {operator.id ? (
          <>
            {dataRemainingCredit.map((data: IRequestCreditDataModel, index: number) => {
              let divide = (data.quantity || 0) / 1; // Convert to number without '%'
              const percentage = divide > 100 ? '100%' : `${divide}%`; // Compare as number
              return (
                <div key={index} className="w-full flex flex-col gap-y-4 mt-2">
                  <div className="w-full grid grid-cols-12 gap-x-4">
                    <h1 className="text-gray-400 col-span-2">{data.value_mb}</h1>
                    <span
                      style={{
                        backgroundColor: colors[index % colors.length],
                        width: percentage,
                      }}
                      className="rounded-md h-8 col-span-8 flex items-center justify-center text-slate-100 text-xs">
                      {parseFloat(percentage) >= 10 && percentage}
                    </span>
                    <p className="text-gray-400 col-span-2">{data.quantity}</p>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <p className="w-full h-full text-center text-xl text-gray-400 my-20">
            Choose your operator{' '}
          </p>
        )}
      </div>
      {role === 'admin' && (
        <UploadPayment uploadedFile={uploadFile} setUploadedFile={setUploadFile} />
      )}
    </div>
  );
};

export default RemainingCredits;
