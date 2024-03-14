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
import { IDataRequestActivationModel } from '../../../../../../domain/model/model';
import { useEffect, useMemo } from 'react';
import VM from '../../../vm/vm';
import { IDataOperatorModel } from '@/core/services/domain/model/region.model';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof IDataRequestActivationModel>(
  order: Order,
  orderBy: Key
): (a: IDataRequestActivationModel, b: IDataRequestActivationModel) => number {
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
  ExcelData,
  operator,
}: {
  ExcelData: any[];
  operator: IDataOperatorModel;
}) {
  const { getData, datas } = VM();
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof IDataRequestActivationModel>('msisdn');
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const data = ExcelData.length ? ExcelData : datas?.data || [];

  useEffect(() => {
    const query = {
      operator_id: operator.id,
      page: page + 1,
      limit: 10,
    };
    getData(query);
  }, [page]);

  const perPage = 10;
  const totalPage =
    data.length % perPage == 0 ? +data.length / perPage : Math.floor(data.length / perPage + 1);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof IDataRequestActivationModel
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = data.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * perPage - data.length) : 0;

  const tempData = useMemo(() => {
    const sortedData = stableSort(data, getComparator(order, orderBy));
    return sortedData.slice(page * perPage, page * perPage + perPage);
  }, [data, order, orderBy, page, perPage]);

  return (
    <Box sx={{ width: '100%' }}>
      <TableContainer className="relative pb-16">
        <Table sx={{ minWidth: 650 }} aria-labelledby="tableTitle">
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
          />
          <TableBody>
            {tempData.map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.id}
                  sx={{ cursor: 'pointer' }}>
                  <TableCell component="th" id={labelId} scope="row" padding="normal">
                    {row.msisdn}
                  </TableCell>
                  <TableCell align="center">{row.operator_id}</TableCell>
                  <TableCell align="center">{row.status}</TableCell>
                  <TableCell align="center">{row.sim_expired}</TableCell>
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
