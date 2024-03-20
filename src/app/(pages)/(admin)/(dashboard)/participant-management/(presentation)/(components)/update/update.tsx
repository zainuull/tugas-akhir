'use client';
import { NotifyService, ToastifyService } from '@/core/services/notify/notifyService';
import { FaRegCircleXmark } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { HandleError } from '@/core/services/handleError/handleError';
import Picker from '@/app/(sharedComponents)/picker';
import { IDataParticipant } from '@/core/services/domain/model/IParticipant';
import VM from '@/core/services/vm/vm';
import { UploadImage } from '@/app/(sharedComponents)/upload.image';

interface IUpdateEndUser {
  isUpdate: boolean;
  setIsUpdate: Function;
  isOverlay: boolean;
  setIsOverlay: Function;
  dataInput: IDataParticipant;
  setDataInput: Function;
  fetchData: Function;
}

const UpdateEndUser = (props: IUpdateEndUser) => {
  const { updateData } = VM();
  const { isUpdate, setIsUpdate, isOverlay, setIsOverlay, dataInput, setDataInput, fetchData } =
    props;
  const [imageUrl, setImageUrl] = useState('');
  const notifyService = new NotifyService();
  const toastifyService = new ToastifyService();
  const [timePicker, setTimePicker] = useState<dayjs.Dayjs | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState('');

  useEffect(() => {
    // Set the protection_period value when dataInput changes
    if (dataInput.protection_period) {
      setSelectedPeriod(dataInput.protection_period);
    }
  }, [dataInput]);

  const handleChange = (e: any) => {
    setDataInput({
      ...dataInput,
      [e.target.id]: e.target.value,
    });
  };

  const handleClose = () => {
    setIsOverlay(!isOverlay);
    setIsUpdate(!isUpdate);
    setDataInput({
      nik: '',
      name: '',
      place_of_birth: '',
      biological_mother: '',
      work: '',
      protection_period: '',
    });
  };

  const handleSubmit = () => {
    const dateTimeFormat = 'YYYY-MM-DD';
    let dateTimePart;
    dateTimePart = timePicker ? timePicker.format(dateTimeFormat) : '';

    const payload = {
      nik: dataInput.nik,
      name: dataInput.name,
      place_of_birth: dataInput.place_of_birth,
      date_of_birth: dateTimePart,
      biological_mother: dataInput.biological_mother,
      work: dataInput.work,
      protection_period: dataInput.protection_period,
      image: imageUrl,
      isPaid: dataInput.isPaid,
      created_at: dataInput.created_at,
    };

    notifyService.confirmationUpdate().then((res) => {
      if (res) {
        updateData(dataInput?.id || '', payload)
          .then(() => {
            fetchData();
            handleClose();
            toastifyService.successUpdate();
          })
          .catch((err) => {
            HandleError(err);
          });
      }
    });
  };

  return (
    <div
      className={`absolute ${
        isUpdate ? 'top-1/2 -translate-y-1/2' : '-top-[1000px]'
      } left-1/2 -translate-x-1/2 w-4/5 xl:w-2/5 min-h-96 bg-white rounded-lg z-10 transition-all duration-500 pb-4`}>
      <div className="w-full flex flex-col px-4 pt-2">
        <span className="w-full flex items-center justify-between">
          <h1 className="text-primary font-semibold">Update User</h1>
          <FaRegCircleXmark
            onClick={handleClose}
            size={20}
            className="text-red-600 cursor-pointer"
          />
        </span>
        <form className="mt-2 flex flex-col gap-y-2">
          <div className="flex flex-col gap-y-1 text-sm">
            <label htmlFor="nik" className="font-medium">
              NIK
            </label>
            <input
              id="nik"
              type="number"
              value={dataInput.nik}
              onChange={handleChange}
              className="bg-gray-100 rounded-lg h-10 px-2 outline-none hover:outline-primary transition-all"
              placeholder="Masukkan NIK anda"
              maxLength={16}
            />
            <label className="text-red-600">
              {dataInput.nik.length < 16
                ? 'Panjang NIK Minimal 16 Digit'
                : dataInput.nik.length > 16
                ? 'Panjang NIK Maksimal 16 Digit'
                : ''}
            </label>
          </div>
          <div className="flex flex-col gap-y-1 text-sm">
            <label htmlFor="name" className="font-medium">
              Nama Lengakp
            </label>
            <input
              id="name"
              type="text"
              value={dataInput.name}
              onChange={handleChange}
              className="bg-gray-100 rounded-lg h-10 px-2 outline-none hover:outline-primary transition-all"
              placeholder="Masukkan nama lengkap anda"
            />
          </div>
          <div className="flex flex-col gap-y-1 text-sm">
            <label htmlFor="place_of_birth" className="font-medium">
              Tempat Lahir
            </label>
            <input
              id="place_of_birth"
              type="text"
              value={dataInput.place_of_birth}
              onChange={handleChange}
              className="bg-gray-100 rounded-lg h-10 px-2 outline-none hover:outline-primary transition-all"
              placeholder="Masukkan tempat lahir anda"
            />
          </div>
          <Picker setTimePicker={setTimePicker} timePicker={timePicker} />
          <div className="flex flex-col gap-y-1 text-sm">
            <label htmlFor="biological_mother" className="font-medium">
              Nama Ibu Kandung
            </label>
            <input
              id="biological_mother"
              type="text"
              value={dataInput.biological_mother}
              onChange={handleChange}
              className="bg-gray-100 rounded-lg h-10 px-2 outline-none hover:outline-primary transition-all"
              placeholder="Masukkan nama ibu kandung anda"
            />
          </div>
          <div className="flex flex-col gap-y-1 text-sm">
            <label htmlFor="work" className="font-medium">
              Pekerjaan
            </label>
            <input
              id="work"
              type="text"
              value={dataInput.work}
              onChange={handleChange}
              className="bg-gray-100 rounded-lg h-10 px-2 outline-none hover:outline-primary transition-all"
              placeholder="Masukkan pekerjaan anda"
            />
          </div>
          <div className="flex flex-col gap-y-1 text-sm">
            <label htmlFor="protection_period" className="font-medium">
              Masa Perlindungan
            </label>
            <select
              id="protection_period"
              value={selectedPeriod}
              onChange={handleChange}
              className="bg-gray-100 rounded-lg h-10 px-2 outline-none hover:outline-primary transition-all">
              <option value="-">Pilih Masa Perlindungan</option>
              <option value="1 Bulan (Rp 16.800)">1 Bulan (Rp 16.800)</option>
              <option value="3 Bulan (Rp 50.400)">3 Bulan (Rp 50.400)</option>
              <option value="6 Bulan (Rp 100.800)">6 Bulan (Rp 100.800)</option>
            </select>
          </div>
          <div className="flex flex-col gap-y-1 text-sm">
            <label className="font-medium">
              Upload Foto Selfie<span className="text-red-600">*</span>
            </label>
            <UploadImage imageUrl={imageUrl} setImageUrl={setImageUrl} />
          </div>
        </form>
        <span className="w-full flex items-center justify-between gap-x-2 mt-5">
          <button onClick={handleClose} className="cancel-button w-1/2 ">
            Batal
          </button>
          <button
            onClick={handleSubmit}
            className={`${
              dataInput.nik.length >= 16 && dataInput.nik.length < 17 ? 'button' : 'disabled-button'
            } w-1/2`}
            disabled={dataInput.nik.length > 16 ? true : false}>
            Update
          </button>
        </span>
      </div>
    </div>
  );
};

export default UpdateEndUser;
