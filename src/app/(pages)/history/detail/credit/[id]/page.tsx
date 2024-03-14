'use client';
import useUser from '@/core/services/store/store.user';
import Order from './(presentation)/(components)/list-order/order';
import UploadPayment from './(presentation)/(components)/upload-payment/upload.payment';

const DetailCredit = ({ params }: { params: { id: number } }) => {
  const [user] = useUser();
  const role = user.data?.privilege?.general_role || '';
  return (
    <main className="w-full flex flex-col xl:flex-row items-start gap-x-4 gap-y-4">
      {/* Order */}
      <Order role={role} />
      {/* Upload Payment */}
      <UploadPayment/>
    </main>
  );
};

export default DetailCredit;
