'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import EnhancedTableHead, { Order } from './header.table';
// Icons
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { CiTrash } from 'react-icons/ci';
import Pagination from './pagination';
import useOverlay from '@/app/(pages)/(admin)/(dashboard)/store/store.notif';
import { useState } from 'react';
import { NotifyService, ToastifyService } from '@/core/services/notify/notifyService';
import { HandleError } from '@/core/services/handleError/handleError';
import ToastNotify from '@/core/services/notify/toast';
import { useRouter } from 'next/navigation';
import { IDataAdmin } from '@/core/services/domain/model/IParticipant';
import VM from '@/core/services/vm/vm';
import UpdateAdmin from '../update/update';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof IDataAdmin>(
  order: Order,
  orderBy: Key
): (a: IDataAdmin, b: IDataAdmin) => number {
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

export default function ListTable({
  data,
  fetchData,
  filterData,
}: {
  data: IDataAdmin[];
  fetchData: Function;
  filterData: IDataAdmin[];
}) {
  const { deleteDataAdmin } = VM();
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof IDataAdmin>('name');
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [isOverlay, setIsOverlay] = useOverlay();
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [dataInput, setDataInput] = useState<IDataAdmin>({
    name: '',
    email: '',
    role: '',
    image: '',
  });
  const notifyService = new NotifyService();
  const toastService = new ToastifyService();
  const rows = filterData || data;
  const router = useRouter();

  const perPage = 4;
  const totalPage =
    rows.length % perPage == 0 ? +rows.length / perPage : Math.floor(rows.length / perPage + 1);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof IDataAdmin) => {
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
    [rows, order, orderBy, page, perPage]
  );

  const handleUpdate = (data: IDataAdmin) => {
    setIsOverlay(!isOverlay);
    setIsUpdate(!isUpdate);
    setDataInput({
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
      image: data.image,
      created_at: data.created_at,
    });
  };

  const handleDelete = (id: string) => {
    notifyService.confirmationDelete().then((res) => {
      if (res) {
        deleteDataAdmin(id)
          .then(() => {
            toastService.successDelete();
            fetchData();
          })
          .catch((err) => {
            HandleError(err);
          });
      }
    });
  };

  const handleDetail = (id: string) => {
    router.push(`/admin-management/detail/${id}`);
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
            {visibleRows.map((row) => {
              return (
                <TableRow hover tabIndex={-1} key={row.id} className="cursor-pointer">
                  <TableCell
                    onClick={() => handleDetail(row.id)}
                    align="left"
                    className="text-xs hover:font-semibold transition-all">
                    {row.name}
                  </TableCell>
                  <TableCell align="left" className="text-xs">
                    {row.email}
                  </TableCell>
                  <TableCell align="left" className="text-xs">
                    {row.role}
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
      {/* Update Admin */}
      <UpdateAdmin
        isUpdate={isUpdate}
        setIsUpdate={setIsUpdate}
        isOverlay={isOverlay}
        setIsOverlay={setIsOverlay}
        dataInput={dataInput}
        setDataInput={setDataInput}
        fetchData={fetchData}
      />
      <ToastNotify />
    </Box>
  );
}
