import { Photo } from './photo';

interface IUploadPayment {
  uploadedFile: File[];
  setUploadedFile: Function;
}

const UploadPayment = (props: IUploadPayment) => {
  const { uploadedFile, setUploadedFile } = props;
  return (
    <div className="w-full flex flex-col gap-y-3">
      {/* <Rekening /> */}
      <div className="w-full bg-white rounded-lg flex flex-col gap-y-2 items-center p-4">
        <h1>Upload Proof of Payment</h1>
        <Photo upload={setUploadedFile} files={uploadedFile} />
      </div>
    </div>
  );
};

export default UploadPayment;
