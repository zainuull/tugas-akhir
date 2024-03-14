'use client';
import Link from 'next/link';
import VM from './(presentation)/vm/vm';
import { useRef, useState } from 'react';
import { IUserContextModel } from './domain/model/model';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { HandleError } from '@/core/services/handleError/handleError';
import { NotifyService } from '@/core/services/notify/notifyService';
import Swal from 'sweetalert2';
import useDeviceDetection from '@/app/deviceDetection';

const Login = () => {
  const { loginData } = VM();
  // const { getProfileWToken } = VMOverview();
  const [viewPwd, setViewPwd] = useState(false);
  const [form, setForm] = useState<IUserContextModel>();
  const notifyService = new NotifyService();

  const passwordRef = useRef<HTMLInputElement>(null);

  useDeviceDetection();

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const tooglePassword = () => {
    if (viewPwd) {
      setForm({ ...form, password: form?.password });
      if (passwordRef.current) {
        passwordRef.current.focus();
      }
    }

    setViewPwd(!viewPwd);
  };

  const handleLogin = () => {
    const payload = {
      username: form?.username || '',
      password: form?.password || '',
    };
    notifyService.showLoading();
    loginData(payload)
      .then((res) => {
        //set localstorage
        if (res) {
          window.localStorage.setItem('currentUser', JSON.stringify(res));
          const test = JSON.stringify(res);
          document.cookie = `token=${test}`;
          Swal.close();
          window.location.href = '/dashboard';
        }
      })
      .catch((err) => HandleError(err));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Check if the pressed key is Enter (key code 13)
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="w-full h-screen bg-secondary p-4 flex items-center justify-center select-none">
      <div className="w-4/5 xl:w-1/3 h-1/2 xl:h-4/5 flex flex-col items-center lg:justify-center xl:justify-normal gap-y-2 bg-white rounded-lg">
        <h1 className="text-xl font-semibold leading-relaxed mt-10">Masuk ke akun Anda</h1>
        <p className="text-gray-400 text-sm lg:text-base">
          Silahkan Masukan Username & kata sandi{' '}
        </p>
        <form className="w-full flex flex-col items-center gap-y-10 mt-2 lg:mt-12">
          <input
            id="username"
            type="tel"
            className="border-2 text-black placeholder:text-gray-600 border-gray-400 rounded-lg px-6 h-16 w-4/5  outline-none"
            placeholder="Masukkan username"
            autoComplete="username"
            value={form?.username || ''}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            required
          />
          <div className="w-4/5  relative">
            <input
              id="password"
              ref={passwordRef}
              type={viewPwd ? 'text' : 'password'}
              className="w-full border-2 text-black placeholder:text-gray-600 border-gray-400 rounded-lg px-6 h-16 outline-none"
              placeholder="Kata Sandi"
              autoComplete="current-password"
              value={form?.password || ''}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              required
            />
            {form?.password && (
              <div className="absolute right-4 bottom-4 flex items-center text-sm leading-5">
                <button
                  onClick={tooglePassword}
                  type="button"
                  className="whitespace-nowrap flex items-center justify-center">
                  {viewPwd ? <FiEye size={24} /> : <FiEyeOff size={24} />}
                </button>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={handleLogin}
            className={`${
              form?.password?.length ? 'bg-primary' : 'disabled-button'
            } rounded-lg px-6 h-16 w-4/5  text-white`}>
            Masuk
          </button>
        </form>
        <p className="text-primary  mt-2 cursor-pointer">Lupa Kata Sandi?</p>
      </div>
    </div>
  );
};

export default Login;
