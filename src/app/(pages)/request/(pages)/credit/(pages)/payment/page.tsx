import Order from './(presentation)/(components)/list-order/order';
import UploadPayment from './(presentation)/(components)/upload-payment/upload.payment';

const RequestCreditPayment = () => {
  return (
    <main className="w-full flex flex-col xl:flex-row items-start gap-x-4 gap-y-4">
      {/* Order */}
      <Order />
      {/* Upload Payment */}
      <UploadPayment />
    </main>
  );
};

export default RequestCreditPayment;
