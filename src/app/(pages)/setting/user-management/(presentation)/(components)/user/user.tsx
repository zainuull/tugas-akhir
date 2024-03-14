'use client';

import ListTable from './components/ltable/list.table';
import useOverlay from '@/app/(pages)/store/store.notif';
import { useState } from 'react';
import CreateUser from './components/create/create';
// Icons
import { HiMagnifyingGlass } from 'react-icons/hi2';

const ListUser = () => {
  const [isOverlay, setIsOverlay] = useOverlay();
  const [isAdd, setIsAdd] = useState<boolean>(false);

  const handleAdd = () => {
    setIsOverlay(!isOverlay);
    setIsAdd(!isAdd);
  };

  return (
    <div className="w-full min-h-40 bg-white flex flex-col rounded-lg ">
      <h1 className="pt-4 px-4">User Management</h1>
      {/* Dropdown */}
      <div className="w-full grid grid-cols-2 items-center gap-x-5 gap-y-2 px-4 text-sm mb-4">
        <button className={`button col-span-1 h-10 mt-4 text-white`} onClick={handleAdd}>
          Add User
        </button>
        <span className="col-span-1 h-full flex items-end">
          <div className="bg-gray-100 w-full flex items-center gap-x-2 rounded-lg px-2 h-10 file:">
            <HiMagnifyingGlass />
            <input className={`bg-transparent outline-none w-full text-sm`} placeholder="Search" />
          </div>
        </span>
      </div>
      <ListTable />
      {/* Add User */}
      <CreateUser
        isAdd={isAdd}
        setIsAdd={setIsAdd}
        isOverlay={isOverlay}
        setIsOverlay={setIsOverlay}
      />
    </div>
  );
};

export default ListUser;
