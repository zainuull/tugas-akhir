const DetailOrder = () => {
  return (
    <div className="w-full bg-white p-4 rounded-lg">
      <div>
        <h1 className="font-semibold text-lg">Order ID: AR-39fu-38nd</h1>
        <span className="flex gap-x-3 text-sm mt-4">
          <span className="flex flex-col gap-y-2">
            <p>Client</p>
            <p>Operator</p>
            <p>Number of Cards </p>
          </span>
          <span className="flex flex-col gap-y-2">
            <p>: Easy Go</p>
            <p>: Telkomsel</p>
            <p>: 500</p>
          </span>
        </span>
      </div>
    </div>
  );
};

export default DetailOrder;
