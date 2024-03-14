import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { IStoreDatas } from '../../../../../(presentation)/store/store.datas';
import { NotifyService } from '@/core/services/notify/notifyService';
import { useRouter } from 'next/navigation';

export default function ListOrder({ data }: { data: IStoreDatas }) {
  const notifyService = new NotifyService();
  const router = useRouter();

  const handleCancel = () => {
    notifyService.confirmationCancel().then((res) => {
      if (res) {
        router.back();
      }
    });
  };

  return (
    <>
      <Table sx={{ minWidth: 60 }}>
        <TableHead>
          <TableRow>
            <TableCell className="font-bold">Credit Denomination</TableCell>
            <TableCell className="font-bold" align="right">
              Unit Price
            </TableCell>
            <TableCell className="font-bold" align="right">
              Units
            </TableCell>
            <TableCell className="font-bold" align="right">
              Total Price
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.quota?.map((row: any) => (
            <TableRow key={row.id}>
              <TableCell>{row.value_mb} MB</TableCell>
              <TableCell align="right">Rp. {row.price?.toLocaleString('id-ID')}</TableCell>
              <TableCell align="right">{row.total_count}</TableCell>
              <TableCell align="right">Rp. {row.total_price?.toLocaleString('id-ID')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <span className="px-4 w-full flex items-center justify-between">
        <span className="font-semibold">
          <p>Total Price</p>
          <h1 className="text-primary">Rp. {data.total_price?.toLocaleString('id-ID')}</h1>
        </span>
        <button onClick={handleCancel} className="button text-xs">
          Cancel Payment
        </button>
      </span>
    </>
  );
}
