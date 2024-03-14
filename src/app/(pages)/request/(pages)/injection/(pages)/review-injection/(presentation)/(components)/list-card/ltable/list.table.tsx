'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import EnhancedTableHead, { Order } from './header.table';
import Pagination from './pagination';
import { useMemo } from 'react';
import { IData } from '../../../../../../domain/model/model';

function createData(
  id: number,
  MSISDN?: string,
  End_User?: string,
  Region?: string,
  Status?: string,
  Quota?: string,
  Quota_Expired?: string
): IData {
  return {
    id,
    MSISDN,
    End_User,
    Region,
    Status,
    Quota,
    Quota_Expired,
  };
}

const rows = [
  createData(1, '088298811234', 'PT Angkasa', 'Jawa Barat', 'Active', 'Active', '2025-01-31'),
  createData(2, '088298811239', 'PT Angkasa', 'Jawa Barat', 'Active', 'Active', '2025-01-31'),
  createData(3, '088298811234', 'PT Angkasa', 'Jawa Barat', 'Active', 'Active', '2025-01-31'),
  createData(4, '088298811234', 'PT Angkasa', 'Jawa Barat', 'Active', 'Active', '2025-01-31'),
  createData(5, '088298811234', 'PT Angkasa', 'Jawa Barat', 'Active', 'Active', '2025-01-31'),
  createData(6, '088298811234', 'PT Angkasa', 'Jawa Barat', 'Active', 'Active', '2025-01-31'),
  createData(7, '088298811234', 'PT Angkasa', 'Jawa Barat', 'Active', 'Active', '2025-01-31'),
  createData(8, '088298811234', 'PT Angkasa', 'Jawa Barat', 'Active', 'Active', '2025-01-31'),
  createData(9, '088298811234', 'PT Angkasa', 'Jawa Barat', 'Active', 'Active', '2025-01-31'),
  createData(10, '088298811234', 'PT Angkasa', 'Jawa Barat', 'Active', 'Active', '2025-01-31'),
  createData(11, '088298811234', 'PT Easy Go', 'Jawa Barat', 'Active', 'Active', '2025-01-31'),
  createData(12, '088298811234', 'PT Easy Go', 'Jawa Barat', 'Active', 'Active', '2025-01-31'),
  createData(13, '088298811234', 'PT Easy Go', 'Jawa Barat', 'Active', 'Active', '2025-01-31'),
  createData(14, '088298811234', 'PT Easy Go', 'Jawa Barat', 'Active', 'Active', '2025-01-31'),
  createData(15, '088298811234', 'PT Easy Go', 'Jawa Barat', 'Active', 'Active', '2025-01-31'),
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
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

export default function ListTable({ data }: { data: any[] }) {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof IData>('End_User');
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);

  const perPage = 10;
  const totalPage = Math.ceil((data?.length || rows.length) / perPage);

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
  const emptyRows = Math.max(0, (1 + page) * perPage - (data?.length || rows.length));

  const combinedData = data && data.length > 0 ? data : rows;

  const tempData = useMemo(() => {
    const sortedData = stableSort(combinedData, getComparator(order, orderBy));
    return sortedData.slice(page * perPage, page * perPage + perPage);
  }, [combinedData, order, orderBy, page, perPage]);

  return (
    <Box sx={{ width: '100%' }}>
      <TableContainer className="relative pb-16">
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody>
            {tempData.map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;
              return (
                <TableRow hover tabIndex={-1} key={row.id} sx={{ cursor: 'pointer' }}>
                  <TableCell component="th" id={labelId} scope="row" padding="normal">
                    {row.MSISDN}
                  </TableCell>
                  <TableCell align="center">{row.End_User}</TableCell>
                  <TableCell align="center">{row.Region}</TableCell>
                  <TableCell align="center">{row.Status}</TableCell>
                  <TableCell align="center">{row.Quota}</TableCell>
                  <TableCell align="center">{row.Quota_Expired}</TableCell>
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
    </Box>
  );
}
