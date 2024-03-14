'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EnhancedTableHead, { Order } from './header.table';
import Pagination from '../pagination';
import { useRouter } from 'next/navigation';
import useUser from '@/core/services/store/store.user';
import { mockActivation } from '../../../data/mockActivation';
import { IData } from '../../../domain/model/model';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof IData>(
  order: Order,
  orderBy: Key
): (a: IData, b: IData) => number {
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

export default function ListActivation() {
  const [user] = useUser();
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof IData>('operator');
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const router = useRouter();
  const rows = mockActivation;
  const role = user.data?.privilege?.general_role || '';

  const perPage = 15;
  const totalPage =
    rows.length % perPage == 0 ? +rows.length / perPage : Math.floor(rows.length / perPage + 1);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof IData) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
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

  const handleDetail = (id: number) => {
    router.push(`detail/activation/${id}`);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%' }}>
        <TableContainer className="relative pb-16">
          <Table sx={{ minWidth: 650 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              role={role}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={row.id}
                    onClick={() => handleDetail(Number(row.id))}
                    className="cursor-pointer">
                    <TableCell component="th" id={labelId} scope="row" padding="normal">
                      {row.time}
                    </TableCell>
                    {role === 'admin' && <TableCell align="center">{row.client}</TableCell>}
                    <TableCell align="center">{row.operator}</TableCell>
                    <TableCell align="center">{row.total_card_to_activate}</TableCell>
                    <TableCell align="center">{row.total_card_activated}</TableCell>
                    <TableCell align="center">{row.status}</TableCell>
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
      </Paper>
    </Box>
  );
}
