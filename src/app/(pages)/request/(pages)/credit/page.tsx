'use client';
import { useEffect, useState } from 'react';
import Operator from './(presentation)/(components)/operator';
import RemainingCredits from './(presentation)/(components)/remaining.credits';
import { IDataEndUserModel, IDataOperatorModel } from '@/core/services/domain/model/region.model';
import useUser from '@/core/services/store/store.user';
import VM from './(presentation)/vm/vm';

const RequestCredit = () => {
  const { getDataCredit, datasCredit, getRemainingCredit, remainingCredit } = VM();
  const [user] = useUser();
  const role = user.data?.privilege?.general_role || '';
  const [operator, setOperator] = useState<IDataOperatorModel>({
    id: 0,
    name: '',
  });
  const [client, setClient] = useState<IDataEndUserModel>({
    id: 0,
    name: '',
  });
  const [uploadedFile, setUploadedFile] = useState<File[]>([]);

  const dataRemainingCredit = remainingCredit?.data || [];
  const dataCredit = datasCredit?.data || [];


  useEffect(() => {
    const query = {
      operator_id: operator.id,
    };
    getRemainingCredit(query);
    getDataCredit(query);
  }, [operator.id]);

  return (
    <main className="w-full flex flex-col xl:flex-row items-start gap-x-4 gap-y-4">
      {/* Left */}
      <Operator
        operator={operator}
        setOperator={setOperator}
        client={client}
        setClient={setClient}
        role={role}
        file={uploadedFile}
        dataCredit={dataCredit}
      />
      {/* Right */}
      <RemainingCredits
        operator={operator}
        role={role}
        uploadFile={uploadedFile}
        setUploadFile={setUploadedFile}
        dataRemainingCredit={dataRemainingCredit}
      />
    </main>
  );
};

export default RequestCredit;
