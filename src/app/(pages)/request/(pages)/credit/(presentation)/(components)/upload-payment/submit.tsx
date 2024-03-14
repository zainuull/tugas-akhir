'use client';
import { NotifyService } from '@/core/services/notify/notifyService';
// import useForm from '../../../../../(presentation)/store/store';
import { useRouter } from 'next/navigation';
import { HandleError } from '@/core/services/handleError/handleError';
import Swal from 'sweetalert2';
import { ViolationService } from '../../../data/service/ViolationReport.service';

const Submit = ({ file }: { file: File[] }) => {
  // const [form, setForm] = useForm();
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
      HandleError(error);
    }
  };

  const createAction = async (photo: any = '') => {
    console.log('photo', photo);

    let payload: any = {};

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
      className={`px-6 py-2 text-sm ${
        file?.length ? 'bg-primary' : 'bg-gray-400 cursor-not-allowed'
      } text-white rounded-lg mt-2`}
      disabled={!file?.length}>
      Send Proof of Payment
    </button>
  );
};

export default Submit;
