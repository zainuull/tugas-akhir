'use client';
import { NotifyService, ToastifyService } from '@/core/services/notify/notifyService';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { FaRegCircleXmark } from 'react-icons/fa6';
import { HandleError } from '@/core/services/handleError/handleError';
import VM from '@/core/services/vm/vm';
import { UploadImage } from '@/app/(sharedComponents)/upload.image';

interface ICreateUser {
  isAdd: boolean;
  setIsAdd: Function;
  isOverlay: boolean;
  setIsOverlay: Function;
  fetchData: Function;
}

const CreateUser = (props: ICreateUser) => {
  const { createDataAdmin } = VM();
  const { isAdd, setIsAdd, isOverlay, setIsOverlay, fetchData } = props;
  const [dataInput, setDataInput] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    image: '',
  });
  const [imageUrl, setImageUrl] = useState('');
  const notifyService = new NotifyService();
  const toastService = new ToastifyService();
  const [viewPwd, setViewPwd] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: any) => {
    setDataInput({
      ...dataInput,
      [e.target.id]: e.target.value,
    });
  };

  const tooglePassword = () => {
    if (viewPwd) {
      setDataInput({ ...dataInput, password: dataInput?.password });
      if (passwordRef.current) {
        passwordRef.current.focus();
      }
    }

    setViewPwd(!viewPwd);
  };

  const handleClose = () => {
    setIsOverlay(!isOverlay);
    setIsAdd(!isAdd);
    setDataInput({
      name: '',
      email: '',
      password: '',
      role: '',
      image: '',
    });
  };

  const handleSubmit = () => {
    const dateTimeFormat = 'YYYY-MM-DD';
    const currentDate = dayjs().format(dateTimeFormat);

    const payload = {
      name: dataInput.name,
      email: dataInput.email,
      passwrd: dataInput.password,
      role: 'admin',
      image: imageUrl,
      created_at: currentDate,
    };

    notifyService.confirmationCreate().then(async (res) => {
      if (res) {
        await createDataAdmin(payload)
          .then(() => {
            fetchData();
            handleClose();
            toastService.successCreate();
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
            <label htmlFor="email" className="font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={dataInput.email}
              onChange={handleChange}
              className="bg-gray-100 rounded-lg h-10 px-2 outline-none hover:outline-primary transition-all"
              placeholder="Masukkan email anda"
            />
          </div>
          <div className="flex flex-col gap-y-1 text-sm relative">
            <label htmlFor="password" className="font-medium">
              Password
            </label>
            <input
              id="password"
              type={viewPwd ? 'text' : 'password'}
              value={dataInput.password}
              onChange={handleChange}
              className="bg-gray-100 rounded-lg h-10 px-2 outline-none hover:outline-primary transition-all"
              placeholder="Masukkan password anda"
            />
            {dataInput?.password && (
              <div className="absolute right-4 bottom-2 flex items-center text-sm leading-5">
                <button
                  onClick={tooglePassword}
                  type="button"
                  className="whitespace-nowrap flex items-center justify-center">
                  {viewPwd ? <FiEye size={24} /> : <FiEyeOff size={24} />}
                </button>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-y-1 text-sm">
            <label htmlFor="role" className="font-medium">
              Role
            </label>
            <input
              id="role"
              type="text"
              value={'admin'}
              readOnly
              onChange={handleChange}
              className="bg-gray-100 rounded-lg h-10 px-2 outline-none hover:outline-primary transition-all"
              placeholder="Masukkan pekerjaan anda"
            />
          </div>
          <div className="flex flex-col gap-y-1 text-sm">
            <label className="font-medium">Upload Foto</label>
            <UploadImage imageUrl={imageUrl} setImageUrl={setImageUrl} />
          </div>
        </form>
        <span className="w-full flex items-center justify-between gap-x-2 mt-5">
          <button onClick={handleClose} className="cancel-button w-1/2 ">
            Batal
          </button>
          <button onClick={handleSubmit} className={`button w-1/2`}>
            Kirim
          </button>
        </span>
      </div>
    </div>
  );
};

export default CreateUser;
