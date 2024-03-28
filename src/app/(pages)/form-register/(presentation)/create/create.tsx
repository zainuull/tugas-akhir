'use client';
import { NotifyService, ToastifyService } from '@/core/services/notify/notifyService';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import VM from '@/core/services/vm/vm';
import useStoreDatas from '../store/store';
import { UploadImage } from '@/app/(sharedComponents)/upload.image';
import { isWeekend } from 'date-fns';
import 'dayjs/locale/id';
import { HandleError } from '@/core/services/handleError/handleError';

const CreateUser = () => {
  const { createData } = VM();
  const [datas, setDatas] = useStoreDatas();
  const [dataInput, setDataInput] = useState({
    nik: '',
    name: '',
    place_of_birth: '',
    date_of_birth: '',
    biological_mother: '',
    work: '',
    protection_period: '',
    created_at: '',
  });
  const [imageUrl, setImageUrl] = useState('');
  const notifyService = new NotifyService();
  const toastifyService = new ToastifyService();
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
  }, []);

  const handleChange = (e: any) => {
    setDataInput({
      ...dataInput,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = () => {
    const dateTimeFormat = 'DD MMMM YYYY';
    const currentDate = dayjs().format(dateTimeFormat);

    // Get the current hour and minute
    const currentHour = dayjs().hour();
    const currentMinute = dayjs().minute();

    // Calculate the queue number based on the current hour and minute
    let queueNumber;
    if (currentHour >= 9 && currentHour < 17) {
      const hourOffset = currentHour - 9; // Offset from 9 AM
      const minuteOffset = currentMinute / 60; // Fractional part of the hour
      const registrationSlot = hourOffset + minuteOffset; // Each hour is a slot
      const queueWithinSlot = Math.floor(registrationSlot * 10); // 10 registrations per hour
      queueNumber = queueWithinSlot + 1; // Add 1 to start from 1
    } else {
      // Queue number calculation for after 5 PM can be handled differently, or you can set a default value
      queueNumber = -1; // Set a default value indicating registration is not allowed
    }

    // Calculate the hour range for the current slot
    const hourStart = Math.floor(currentHour); // Start hour of the slot
    const hourEnd = hourStart + 1; // End hour of the slot

    // Format the current date and time with hour range
    const currentDateTime = `${currentDate} Pukul:${hourStart}:00 - ${hourEnd}:00 WIB`;

    const queu = `${currentDateTime}`;

    const payload = {
      nik: dataInput.nik,
      name: dataInput.name,
      place_of_birth: dataInput.place_of_birth,
      date_of_birth: dataInput.date_of_birth,
      biological_mother: dataInput.biological_mother,
      work: dataInput.work,
      protection_period: dataInput.protection_period,
      image: imageUrl,
      isPaid: false,
      created_at: currentDate,
      no_antrian: queu,
    };

    notifyService.confirmationCreate().then((res) => {
      if (res) {
        createData(payload)
          .then(() => {
            setDatas(payload);
            router.push('/form-register/detail');
            toastifyService.successCreate();
          })
          .catch((err) => {
            HandleError(err);
          });
      }
    });
  };

  return (
    <div className={`w-full xl:w-2/5 min-h-96 bg-white rounded-lg pb-8`}>
      <div className="w-full flex flex-col px-4 pt-2">
        <h1 className="text-primary font-semibold">Form Registrasi</h1>
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
          <div className="flex flex-col gap-y-1 text-sm">
            <label htmlFor="date_of_birth" className="font-medium">
              Tanggal Lahir
            </label>
            <input
              id="date_of_birth"
              type="date"
              value={dataInput.date_of_birth}
              onChange={handleChange}
              max={dayjs().format('YYYY-MM-DD')}
              className="w-full bg-gray-100 rounded-lg h-10 px-2 outline-none hover:outline-primary transition-all"
            />
          </div>
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
          <button className="cancel-button w-1/2 ">Batal</button>
          <button
            onClick={handleSubmit}
            className={`${
              dataInput.nik.length >= 16 && dataInput.nik.length < 17 && imageUrl.length
                ? 'button'
                : 'disabled-button'
            } w-1/2`}
            disabled={dataInput.nik.length > 16 && imageUrl.length ? true : false}>
            Kirim
          </button>
        </span>
      </div>
    </div>
  );
};

export default CreateUser;
