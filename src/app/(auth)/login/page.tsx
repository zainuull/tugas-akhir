'use client';
import { useEffect, useRef, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { IUserContextModel } from './domain/model/model';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { HandleError } from '@/core/services/handleError/handleError';
import { NotifyService } from '@/core/services/notify/notifyService';
import Swal from 'sweetalert2';
import useDeviceDetection from '@/app/deviceDetection';
import { redirect, useRouter } from 'next/navigation';

const Login = () => {
  const router = useRouter();
  const [viewPwd, setViewPwd] = useState(false);
  const [form, setForm] = useState<IUserContextModel>();
  const notifyService = new NotifyService();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { status } = useSession();

  useEffect(() => {
    if (status !== 'authenticated') {
      return;
    } else {
      redirect('/dashboard');
    }
  }, [status]);

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

  const handleLogin = async (e: any) => {
    notifyService.showLoading();
    setIsLoading(true);

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: form?.email || '',
        password: form?.password || '',
        callbackUrl: '/',
      });

      if (!res?.error) {
        notifyService.successLogin();
        router.replace('/');
        Swal.close();
      } else {
        console.log(res?.error);
        notifyService.wrongPassword();
      }
    } catch (error) {
      console.log(error);
      HandleError(error);
      setError('Email atau password salah');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Check if the pressed key is Enter (key code 13)
    if (e.key === 'Enter') {
      handleLogin(e);
    }
  };

  return (
    <div className="w-full h-screen bg-secondary p-4 flex items-center justify-center select-none">
      <div className="w-4/5 xl:w-1/3 h-1/2 xl:h-4/5 flex flex-col items-center lg:justify-center xl:justify-normal gap-y-2 bg-white rounded-lg">
        <h1 className="text-xl font-semibold leading-relaxed mt-10">Masuk ke akun Anda</h1>
        <p className="text-gray-400 text-sm lg:text-base">Silahkan Masukan Email & kata sandi </p>
        <form className="w-full flex flex-col items-center gap-y-10 mt-2 lg:mt-12">
          <input
            id="email"
            type="mail"
            className="border-2 text-black placeholder:text-gray-600 border-gray-400 rounded-lg px-6 h-16 w-4/5  outline-none"
            placeholder="Masukkan email"
            autoComplete="email"
            value={form?.email || ''}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            required
          />
          <div className="w-4/5 relative">
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
            {isLoading ? 'Loading...' : 'Login'}
          </button>
        </form>
        {error && <p className="text-red-500 font-medium">{error}</p>}
        <p className="text-primary  mt-2 cursor-pointer">Lupa Kata Sandi?</p>
      </div>
    </div>
  );
};

export default Login;
