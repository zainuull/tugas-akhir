'use client';
import { NotifyService, ToastifyService } from '@/core/services/notify/notifyService';
import dayjs from 'dayjs';
import { useState } from 'react';
import { FaRegCircleXmark } from 'react-icons/fa6';
import Picker from './picker';
import VM from '../../vm/vm';
import { HandleError } from '@/core/services/handleError/handleError';

interface ICreateUser {
  isAdd: boolean;
  setIsAdd: Function;
  isOverlay: boolean;
  setIsOverlay: Function;
}

const CreateUser = (props: ICreateUser) => {
  const { createData, getData } = VM();
  const { isAdd, setIsAdd, isOverlay, setIsOverlay } = props;
  const [dataInput, setDataInput] = useState({
    nik: '',
    name: '',
    place_of_birth: '',
    biological_mother: '',
    work: '',
    protection_period: '',
  });
  const [timePicker, setTimePicker] = useState<dayjs.Dayjs | null>(null);
  const notifyService = new NotifyService();
  const toastService = new ToastifyService();

  const handleChange = (e: any) => {
    setDataInput({
      ...dataInput,
      [e.target.id]: e.target.value,
    });
  };

  const handleClose = () => {
    setIsOverlay(!isOverlay);
    setIsAdd(!isAdd);
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
    };

    notifyService.confirmationCreate().then((res) => {
      if (res) {
        createData(payload)
          .then(() => {
            getData();
            // toastService.successCreate();
            handleClose();
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
        isAdd ? 'top-1/2 -translate-y-1/2' : '-top-[1000px]'
      } left-1/2 -translate-x-1/2 w-4/5 xl:w-2/5 min-h-96 bg-white rounded-lg z-10 transition-all duration-500 pb-4`}>
      <div className="w-full flex flex-col px-4 pt-2">
        <span className="w-full flex items-center justify-between">
          <h1 className="text-primary font-semibold">Create User</h1>
          <FaRegCircleXmark
            onClick={handleClose}
            size={20}
            className="text-red-600 cursor-pointer"
          />
        </span>
        <form className="mt-5 flex flex-col gap-y-2">
          <div className="flex flex-col gap-y-1 text-sm">
            <label htmlFor="nik" className="font-medium">
              NIK
            </label>
            <input
              id="nik"
              type="text"
              value={dataInput.nik}
              onChange={handleChange}
              className="bg-gray-100 rounded-lg h-10 px-2 outline-none hover:outline-primary transition-all"
              placeholder="Masukkan NIK anda"
            />
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
              onChange={handleChange}
              className="bg-gray-100 rounded-lg h-10 px-2 outline-none hover:outline-primary transition-all">
              <option value="1 Bulan (Rp 16.800)">1 Bulan (Rp 16.800)</option>
              <option value="3 Bulan (Rp 59.400)">3 Bulan (Rp 59.400)</option>
              <option value="6 Bulan (Rp 100.800)">6 Bulan (Rp 100.800)</option>
            </select>
          </div>
        </form>
        <span className="w-full flex items-center justify-between gap-x-2 mt-5">
          <button onClick={handleClose} className="cancel-button w-1/2 ">
            Batal
          </button>
          <button onClick={handleSubmit} className="button w-1/2 ">
            Kirim
          </button>
        </span>
      </div>
    </div>
  );
};

export default CreateUser;
