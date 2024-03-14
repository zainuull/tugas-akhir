import { IDataOperatorModel } from '@/core/services/domain/model/region.model';
import { mockData } from '../../../../data/mock';
import { IRequestInjectionDataModel } from '../../../../domain/model/model';

interface IRemainingCredit {
  operator: IDataOperatorModel;
}

const RemainingCredits = (props: IRemainingCredit) => {
  const colors = ['#6B0908', '#9D0106', '#D00000', '#E85D04'];
  const { operator } = props;

  return (
    <div className="w-full min-h-40 bg-white flex flex-col p-4 rounded-lg gap-y-4 pb-10">
      <div className="w-full flex items-center justify-between">
        <h1 className="font-semibold text-primary">Remaining Credits</h1>
        <p className="text-gray-400">{operator.id}</p>
      </div>
      {operator.id ? (
        <>
          {mockData.map((data: IRequestInjectionDataModel, index: number) => {
            let percentage = (data.credit || 0) / 10; // Convert to number without '%'
            const width = percentage > 100 ? '100%' : `${percentage}%`; // Compare as number
            return (
              <div key={index} className="w-full flex flex-col gap-y-4 mt-2">
                <div className="w-full grid grid-cols-12 gap-x-4">
                  <h1 className="text-gray-400 col-span-2">{data.quota}</h1>
                  <span
                    style={{
                      backgroundColor: colors[index % colors.length],
                      width: width,
                    }}
                    className="rounded-md h-8 col-span-8"></span>
                  <p className="text-gray-400 col-span-2">{data.credit}</p>
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
  );
};

export default RemainingCredits;
