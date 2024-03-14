'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import EnhancedTableHead, { Data, Order } from './header.table';
import Pagination from './pagination';
import { BsFillCheckCircleFill, BsXCircleFill } from 'react-icons/bs';

function createData(
  id: number,
  phone: string,
  end_user: string,
  region: string,
  status: string,
  quota: string,
  quota_expired: string,
  cycle: number,
  activation_status: boolean
): Data {
  return {
    id,
    phone,
    end_user,
    region,
    status,
    quota,
    quota_expired,
    cycle,
    activation_status,
  };
}

const rows = [
  createData(1, '088298811234', 'Easy Go', 'Jawa Barat', 'Active', 'Active', '2025-01-31', 1, true),
  createData(
    2,
    '088298811234',
    'Easy Go',
    'Jawa Tengah',
    'Active',
    'Active',
    '2025-01-31',
    1,
    false
  ),
  createData(3, '088298811234', 'Easy Go', 'Jawa Barat', 'Active', 'Active', '2025-01-31', 1, true),
  createData(4, '088298811234', 'Easy Go', 'Jawa Barat', 'Active', 'Active', '2025-01-31', 1, true),
  createData(5, '088298811234', 'Easy Go', 'Jawa Barat', 'Active', 'Active', '2025-01-31', 1, true),
  createData(6, '088298811234', 'Easy Go', 'Jawa Barat', 'Active', 'Active', '2025-01-31', 1, true),
  createData(7, '088298811234', 'Easy Go', 'Jawa Barat', 'Active', 'Active', '2025-01-31', 1, true),
  createData(8, '088298811234', 'Easy Go', 'Jawa Barat', 'Active', 'Active', '2025-01-31', 1, true),
  createData(9, '088298811234', 'Easy Go', 'Jawa Barat', 'Active', 'Active', '2025-01-31', 1, true),
  createData(
    10,
    '088298811234',
    'Easy Go',
    'Jawa Barat',
    'Active',
    'Active',
    '2025-01-31',
    1,
    true
  ),
  createData(
    11,
    '088298811234',
    'PT Angkasa',
    'Jawa Barat',
    'Active',
    'Active',
    '2025-01-31',
    1,
    true
  ),
  createData(
    12,
    '088298811234',
    'PT Angkasa',
    'Jawa Barat',
    'Active',
    'Active',
    '2025-01-31',
    1,
    true
  ),
  createData(
    13,
    '088298811234',
    'PT Angkasa',
    'Jawa Barat',
    'Active',
    'Active',
    '2025-01-31',
    1,
    true
  ),
  createData(
    14,
    '088298811234',
    'PT Angkasa',
    'Jawa Barat',
    'Active',
    'Active',
    '2025-01-31',
    1,
    true
  ),
  createData(
    15,
    '088298811234',
    'PT Angkasa',
    'Jawa Barat',
    'Active',
    'Active',
    '2025-01-31',
    1,
    true
  ),
  createData(
    16,
    '088298811234',
    'PT Angkasa',
    'Jawa Barat',
    'Active',
    'Active',
    '2025-01-31',
    1,
    true
  ),
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

export default function ListTable() {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('end_user');
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);

  const perPage = 10;
  const totalPage =
    rows.length % perPage == 0 ? +rows.length / perPage : Math.floor(rows.length / perPage + 1);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
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

  // Helper function to convert activation_status to a consistent type
  function convertActivationStatus(value: string | number | boolean): string | number {
    if (typeof value === 'boolean') {
      return value ? 1 : 0; // Convert boolean to number (1 for true, 0 for false)
    }
    return value; // For string and number, return as is
  }

  const visibleRows = React.useMemo(
    () =>
      stableSort(
        rows.map((row) => ({
          ...row,
          activation_status: convertActivationStatus(row.activation_status),
        })),
        getComparator(order, orderBy)
      ).slice(page * perPage, page * perPage + perPage),
    [rows, order, orderBy, page, perPage]
  );

  return (
    <Box sx={{ width: '100%' }}>
      <TableContainer className="relative pb-16">
        <Table sx={{ minWidth: 950 }} aria-labelledby="tableTitle">
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
              const labelId = `enhanced-table-checkbox-${index}`;
              return (
                <TableRow hover tabIndex={-1} key={row.id}>
                  <TableCell component="th" id={labelId} scope="row" padding="normal">
                    {row.phone}
                  </TableCell>
                  <TableCell align="center" className='text-xs'>{row.end_user}</TableCell>
                  <TableCell align="center">{row.region}</TableCell>
                  <TableCell align="center">{row.status}</TableCell>
                  <TableCell align="center">{row.quota}</TableCell>
                  <TableCell align="center">{row.quota_expired}</TableCell>
                  <TableCell align="center">{row.cycle}</TableCell>
                  <TableCell align="center">
                    {row.activation_status ? (
                      <BsFillCheckCircleFill
                        size={18}
                        className="w-full text-center text-green-600"
                      />
                    ) : (
                      <BsXCircleFill size={18} className="w-full text-center text-red-600" />
                    )}
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
    </Box>
  );
}
