'use client';
import ListOrder from './list.order';
import { NotifyService } from '@/core/services/notify/notifyService';
import { useRouter } from 'next/navigation';

const Order = ({ role }: { role: string }) => {
  const notifyService = new NotifyService();
  const router = useRouter();


  const handleAccept = () => {
    notifyService.confirmationCreate().then((res) => {
      if (res) {
        router.push('/dashboard');
      }
    });
  };

  const handleInject = () => {
    notifyService.confirmationInject().then((res) => {
      if (res) {
        router.push('/dashboard');
      }
    });
  };

  return (
    <div className="w-full xl:w-[55%] bg-white flex flex-col rounded-lg gap-y-4 pb-5">
      <h1 className="font-semibold text-primary text-xl px-4 mt-4">Order ID: CR-39fu-38nd</h1>
      {role == 'admin' ? (
        <span className="flex gap-x-3 text-sm px-4">
          <span className="flex flex-col gap-y-2">
            <p>Client</p>
            <p>Operator</p>
            <p>Request Creation Time</p>
          </span>
          <span className="flex flex-col gap-y-2">
            <p>: Easy Go</p>
            <p>: Telkomsel</p>
            <p>: 2024-02-25 07:00:00 WIB</p>
          </span>
        </span>
      ) : (
        <div className="w-full flex items-center justify-between text-sm px-4">
          <p>Operator : Telkomsel</p>
        </div>
      )}
      {/* List Order */}
      <ListOrder />
      {/* Submit In Admin */}
      {role === 'admin' && (
        <span className="w-full flex items-center gap-x-4 px-4">
          <button onClick={handleAccept} className="button w-1/2">
            Accept Request
          </button>
          <button onClick={handleInject} className="inject-button w-1/2">
            Inject Request
          </button>
        </span>
      )}
    </div>
  );
};
export default Order;
