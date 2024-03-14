import { IDataEndUserModel, IDataOperatorModel } from '@/core/services/domain/model/region.model';
import { NotifyService } from '@/core/services/notify/notifyService';
import { useRouter } from 'next/navigation';
import { CountsState } from '../operator';
import { HandleError } from '@/core/services/handleError/handleError';
import { ViolationService } from '../../../data/service/ViolationReport.service';
import { IRequestCreditDataModel } from '../../../domain/model/model';

interface ISubmit {
  client: IDataEndUserModel;
  counts: CountsState;
  totalPrice: Function;
  operator: IDataOperatorModel;
  file: File[];
  dataCredit: IRequestCreditDataModel[];
}

const SubmitAdmin = (props: ISubmit) => {
  const { client, counts, totalPrice, operator, file, dataCredit } = props;
  const notifyService = new NotifyService();
  const router = useRouter();

  const handleAction = async () => {
    notifyService.confirmationCreate().then(async (res) => {
      if (res) {
        if (file.length) {
          try {
            const results = await Promise.all(file.map(uploadFile)); // code dari Chat GPT, intinya buat multiple send file di mapping
            console.log('Result:', results);

            if (results) {
              createAction(results[0]);
            }
            // Handle the result as needed
          } catch (error) {
            console.error('Error:', error);
            // Handle errors
          }
        } else {
          createAction();
        }
      }
    });
  };

  const uploadFile = async (image: File) => {
    console.log('image', image);

    const violationService = new ViolationService();
    try {
      const res = await violationService.sendPhoto(image);
      return res;
    } catch (error) {
      console.log('err', error);
      HandleError(error);
    }
  };

  const createAction = async (photo: any = '') => {
    const quotaArray = Object.keys(counts)
      .map((id) => {
        const numericId = parseInt(id);
        const count = counts[numericId];
        const item = dataCredit.find((data) => data.id === numericId);
        const valueMb = item?.value_mb || 0;
        const price = item?.price || 0;
        const totalPrice = price * count;
        return {
          id: numericId,
          value_mb: valueMb,
          total_count: count,
          price: price,
          total_price: totalPrice,
        };
      })
      .filter((entry) => entry.total_count !== 0);

    let payload = {
      client: client,
      operator: operator,
      quota: quotaArray,
      total_price: totalPrice(),
      foto: '',
    };

    if (photo) {
      const foto = photo.image_url || '';
      payload = { ...payload, foto: foto };
    }
    try {
      //   notifyService.showLoading();
      //   await createData(payload).then(() => {
      //     Swal.close();
      router.push('/history');
      //     notifyService.successCreate();
      //   });
      console.log('payload', payload);
    } catch (err) {
      HandleError(err);
    }
  };

  return (
    <button
      onClick={handleAction}
      className={`px-6 py-2 rounded-lg ${
        Object.values(counts).some((count) => count > 0) && file.length
          ? 'bg-primary'
          : 'bg-gray-400 cursor-not-allowed'
      } text-white`}
      disabled={!Object.values(counts).some((count) => count > 0)}>
      Send Request
    </button>
  );
};

export default SubmitAdmin;
