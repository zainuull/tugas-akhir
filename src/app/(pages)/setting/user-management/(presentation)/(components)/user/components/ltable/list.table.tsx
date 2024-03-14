'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { mockDataEndUser } from '@/app/(pages)/setting/user-management/data/mock';
import EnhancedTableHead, { Order } from './header.table';
// Icons
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { CiTrash } from 'react-icons/ci';
import Pagination from './pagination';
import useOverlay from '@/app/(pages)/store/store.notif';
import { useEffect, useState } from 'react';
import UpdateEndUser from '../update/update';
import { NotifyService } from '@/core/services/notify/notifyService';
import VM from '../../../../vm/vm';
import { IDataEndUser } from '@/app/(pages)/setting/user-management/domain/model/model';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof IDataEndUser>(
  order: Order,
  orderBy: Key
): (a: IDataEndUser, b: IDataEndUser) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function ListTable() {
  const { getEndUser, endUser } = VM();
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof IDataEndUser>('name');
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [isOverlay, setIsOverlay] = useOverlay();
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [dataInput, setDataInput] = useState<IDataEndUser>({
    name: '',
    email: '',
    age: '',
    province: '',
  });
  const rows = mockDataEndUser;
  const notifyService = new NotifyService();

  const perPage = 4;
  const totalPage =
    rows.length % perPage == 0 ? +rows.length / perPage : Math.floor(rows.length / perPage + 1);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof IDataEndUser) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows?.filter((n) => n.id !== undefined).map((n) => n.id!) ?? [];
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * perPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * perPage,
        page * perPage + perPage
      ),
    [order, orderBy, page, perPage]
  );

  const handleUpdate = (data: IDataEndUser) => {
    setIsOverlay(!isOverlay);
    setIsUpdate(!isUpdate);
    setDataInput({
      id: data.id,
      name: data.name,
      email: data.email,
      age: data.age,
      province: data.province,
    });
  };

  const handleDelete = (id: string) => {
    notifyService.confirmationDelete().then((res) => {
      if (res) {
        console.log('id', id);
      }
    });
  };

  return (
    <Box sx={{ width: '100%' }}>
      <TableContainer className="relative pb-16">
        <Table sx={{ minWidth: 200 }} aria-labelledby="tableTitle">
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody>
            {visibleRows.map((row, index) => {
              return (
                <TableRow hover tabIndex={-1} key={row.id} className="cursor-pointer">
                  <TableCell align="left" className="text-xs">
                    {row.name}
                  </TableCell>
                  <TableCell align="left" className="text-xs">
                    {row.email}
                  </TableCell>
                  <TableCell align="left" className="text-xs">
                    {row.age}
                  </TableCell>
                  <TableCell align="left" className="text-xs">
                    {row.province}
                  </TableCell>
                  <TableCell align="left">
                    <span className="flex items-center gap-x-2">
                      <HiOutlinePencilSquare onClick={() => handleUpdate(row)} size={18} />
                      <CiTrash onClick={() => handleDelete(row?.id || '')} size={18} />
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
            {emptyRows > 0 && (
              <TableRow>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <nav className="absolute right-4 bottom-4">
          <Pagination pageNow={page} totalPage={+totalPage} setPage={setPage} />
        </nav>
      </TableContainer>
      {/* Update End User */}
      <UpdateEndUser
        isUpdate={isUpdate}
        setIsUpdate={setIsUpdate}
        isOverlay={isOverlay}
        setIsOverlay={setIsOverlay}
        dataInput={dataInput}
        setDataInput={setDataInput}
      />
    </Box>
  );
}
