'use client';
import { NotifyService, ToastifyService } from '@/core/services/notify/notifyService';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { FaRegCircleXmark } from 'react-icons/fa6';
import Picker from '@/app/(sharedComponents)/picker';
import { HandleError } from '@/core/services/handleError/handleError';
import VM from '@/core/services/vm/vm';
import { UploadImage } from '@/app/(sharedComponents)/upload.image';
import { useRouter } from 'next/navigation';
import { isWeekend } from 'date-fns';

interface ICreateUser {
  isAdd: boolean;
  setIsAdd: Function;
  isOverlay: boolean;
  setIsOverlay: Function;
  fetchData: Function;
}

const CreateUser = (props: ICreateUser) => {
  const { createData } = VM();
  const { isAdd, setIsAdd, isOverlay, setIsOverlay, fetchData } = props;
  const [dataInput, setDataInput] = useState({
    nik: '',
    name: '',
    place_of_birth: '',
    biological_mother: '',
    work: '',
    protection_period: '',
    image: '',
  });
  const [imageUrl, setImageUrl] = useState('');
  const [timePicker, setTimePicker] = useState<dayjs.Dayjs | null>(null);
  const notifyService = new NotifyService();
  const toastService = new ToastifyService();
  const router = useRouter();

  useEffect(() => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    // Check if it's a weekend
    if (isWeekend(currentTime)) {
      notifyService.notAccess().then((res) => {
        if (res) {
          router.push('https://www.google.com/');
        }
      });
    } else if (currentHour < 8 || currentHour >= 23) {
      // Check if it's outside of working hours
      notifyService.notAccess().then((res) => {
        if (res) {
          router.push('https://www.google.com/');
        }
      });
    }
  }, [isAdd]);

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
      image: '',
    });
  };

  const handleSubmit = () => {
    const dateTimeFormat = 'YYYY-MM-DD';
    let dateTimePart;
    dateTimePart = timePicker ? timePicker.format(dateTimeFormat) : '';
    const currentDate = dayjs().add(1, 'days').format(dateTimeFormat);
    const createdDate = dayjs().format(dateTimeFormat);

    // Get the current hour and minute
    const currentHour = dayjs().hour();
    const currentMinute = dayjs().minute();

    let queueNumber;
    if (currentHour >= 8 && currentHour < 15 && currentHour !== 15) {
      const hourOffset = currentHour - 8; // Offset from 8 AM
      const minuteOffset = currentMinute / 60; // Fractional part of the hour
      const registrationSlot = hourOffset + minuteOffset; // Each hour is a slot
      const queueWithinSlot = Math.floor(registrationSlot * 40); // 40 registrations per hour
      queueNumber = queueWithinSlot + 1; // Add 1 to start from 1
    } else if (currentHour === 15 && currentMinute <= 30) {
      // Special handling for the slot ending at 15:30
      const hourOffset = currentHour - 8; // Offset from 8 AM
      const minuteOffset = currentMinute / 60; // Fractional part of the hour
      const registrationSlot = hourOffset + minuteOffset; // Each hour is a slot
      const queueWithinSlot = Math.floor(registrationSlot * 40); // 40 registrations per hour
      queueNumber = queueWithinSlot + 1; // Add 1 to start from 1
      if (queueWithinSlot >= 350) {
        // Adjust queue number if the maximum slot limit is reached
        queueNumber = -1; // Set a default value indicating registration is not allowed
        // Prevent access to the page
        notifyService.quotaFull().then((res) => {
          if (res) {
            router.push('https://www.google.com/');
          }
        });
        return; // Exit the function early
      }
    } else {
      // Queue number calculation for after 15:30 or before 8 AM
      queueNumber = -1; // Set a default value indicating registration is not allowed
      // Prevent access to the page
      notifyService.notAccess().then((res) => {
        if (res) {
          router.push('https://www.google.com/');
        }
      });
      return; // Exit the function early
    }
    // Calculate the hour range for the current slot
    const hourStart = Math.floor(currentHour); // Start hour of the slot
    const hourEnd = hourStart === 15 && currentMinute > 30 ? 16 : hourStart + 1; // End hour of the slot

    // Format the current date and time with hour range
    const currentDateTime = `${currentDate} Pukul:${hourStart}:00 - ${hourEnd}:00 WIB`;

    const payload = {
      nik: dataInput.nik,
      name: dataInput.name,
      place_of_birth: dataInput.place_of_birth,
      date_of_birth: dateTimePart,
      biological_mother: dataInput.biological_mother,
      work: dataInput.work,
      protection_period: dataInput.protection_period,
      image: imageUrl,
      isPaid: false,
      created_at: createdDate,
      no_antrian: String(queueNumber),
      time: currentDateTime,
    };

    notifyService.confirmationCreate().then((res) => {
      if (res) {
        createData(payload)
          .then(() => {
            fetchData();
            handleClose();
            toastService.successCreate();
            router.push('/dashboard/participant-today');
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
                : dataInput.nik.length > 16 && 'Panjang NIK Maksimal 16 Digit'}
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
            Kirim
          </button>
        </span>
      </div>
    </div>
  );
};

export default CreateUser;
