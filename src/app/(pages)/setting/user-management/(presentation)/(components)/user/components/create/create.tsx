'use client';
import { NotifyService } from '@/core/services/notify/notifyService';
import { useState } from 'react';
import { FaRegCircleXmark } from 'react-icons/fa6';

interface ICreateUser {
  isAdd: boolean;
  setIsAdd: Function;
  isOverlay: boolean;
  setIsOverlay: Function;
}

const CreateUser = (props: ICreateUser) => {
  const { isAdd, setIsAdd, isOverlay, setIsOverlay } = props;
  const [dataInput, setDataInput] = useState({
    name: '',
    email: '',
    age: '',
    province: '',
  });
  const notifyService = new NotifyService();


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
      name: '',
      email: '',
      age: '',
      province: '',
    });
  };

  const handleSubmit = () => {
    notifyService.confirmationCreate().then((res) => {
      if (res) {
        console.log('payload', dataInput);
        handleClose();
      }
    });
  };

  return (
    <div
      className={`absolute ${
        isAdd ? 'top-0 translate-y-1/2 xl:top-1/2 xl:-translate-y-2/3' : '-top-[1000px]'
      } left-1/2 -translate-x-1/2 w-4/5 xl:w-2/5 h-1/4 xl:h-1/2 bg-white rounded-lg z-10 transition-all duration-500`}>
      <div className="w-full flex flex-col px-4 pt-2">
        <span className="w-full flex items-center justify-between">
          <h1 className="text-primary font-semibold">Create End User</h1>
          <FaRegCircleXmark
            onClick={handleClose}
            size={20}
            className="text-red-600 cursor-pointer"
          />
        </span>
        <form className="mt-5 flex flex-col gap-y-3">
          <div className="flex flex-col gap-y-1 text-sm">
            <label htmlFor="name" className="font-medium">
              Nama
            </label>
            <input
              id="name"
              type="text"
              value={dataInput.name}
              onChange={handleChange}
              className="bg-gray-100 rounded-lg h-10 px-2 outline-none hover:outline-primary transition-all"
              placeholder="Masukkan nama anda"
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
          <div className="flex flex-col gap-y-1 text-sm">
            <label htmlFor="age" className="font-medium">
              Umur
            </label>
            <input
              id="age"
              type="number"
              value={dataInput.age}
              onChange={handleChange}
              className="bg-gray-100 rounded-lg h-10 px-2 outline-none hover:outline-primary transition-all"
              placeholder="Masukkan umur anda"
            />
          </div>
        </form>
        <span className="w-full flex items-center justify-between gap-x-2 mt-10">
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
