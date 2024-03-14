import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { mockData } from '../../../data/mock';
import { IRequestCreditDataModel } from '../../../domain/model/model';

export default function ListOrder() {
  return (
    <>
      <Table sx={{ minWidth: 60 }}>
        <TableHead>
          <TableRow>
            <TableCell className='font-bold'>Credit Denomination</TableCell>
            <TableCell className='font-bold' align="right">Unit Price</TableCell>
            <TableCell className='font-bold' align="right">Units</TableCell>
            <TableCell className='font-bold' align="right">Total Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mockData.map((row: IRequestCreditDataModel) => (
            <TableRow key={row.id}>
              <TableCell>{row.quota}</TableCell>
              <TableCell align="right">Rp. {row.price?.toLocaleString('id-ID')}</TableCell>
              <TableCell align="right">{row.credit}</TableCell>
              <TableCell align="right">
                {row.price && row.credit
                  ? `Rp. ${(row.price * row.credit).toLocaleString('id-ID')}`
                  : 'N/A'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <span className="px-4">
        <p>Total Price</p>
        <h1 className="font-semibold text-primary">Rp.250.000.000</h1>
      </span>
    </>
  );
}
