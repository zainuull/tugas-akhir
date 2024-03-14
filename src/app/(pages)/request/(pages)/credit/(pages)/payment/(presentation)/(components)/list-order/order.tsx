'use client';
import { useEffect, useState } from 'react';
import ListOrder from './list.order';
import useStoreDatas from '../../../../../(presentation)/store/store.datas';
import { NotifyService } from '@/core/services/notify/notifyService';
import { useRouter } from 'next/navigation';

const Order = () => {
  const [storeDatas] = useStoreDatas();
  const [timeRemaining, setTimeRemaining] = useState(30 * 60); // 30 minutes in seconds
  const notifyService = new NotifyService();
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        const newTime = prevTime - 1;
        if (newTime <= 0) {
          clearInterval(timer);
          notifyService.timeOutNotification().then((res) => {
            if (res) {
              router.back();
            }
          });
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full xl:w-[55%] bg-white flex flex-col rounded-lg gap-y-4 pb-5">
      <h1 className="font-semibold text-primary text-xl px-4 mt-4">Order ID: CR-39fu-38nd</h1>
      <div className="w-full flex items-center justify-between text-sm px-4">
        <p>Operator : {storeDatas.operator?.name}</p>
        <p>
          Payment Time Limit :{' '}
          <span className="px-4 py-1 bg-primary text-white rounded-lg mx-2">
            {formatTime(timeRemaining)}
          </span>
        </p>
      </div>
      {/* List Order */}
      <ListOrder data={storeDatas} />
    </div>
  );
};
export default Order;
