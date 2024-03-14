'use client';
import { useState } from 'react';
import ListEndUser from './(presentation)/(components)/user/user';
import { IDataOperatorModel } from '@/core/services/domain/model/region.model';

const UserManagement = () => {
  const [operator, setOperator] = useState<IDataOperatorModel>({
    id: 0,
    name: '',
  });

  return (
    <main className="w-full flex flex-col xl:flex-row items-start gap-x-4 gap-y-4">
      {/* Right */}
      <div className="w-full grid grid-cols-1 gap-2">
        <ListEndUser />
      </div>
    </main>
  );
};

export default UserManagement;
