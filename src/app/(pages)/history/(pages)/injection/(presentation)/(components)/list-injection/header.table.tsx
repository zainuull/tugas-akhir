import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import { IData } from '../../../domain/model/model';
import { useEffect, useState } from 'react';

export type Order = 'asc' | 'desc';

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof IData) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  role?: string;
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof IData;
  label: string;
  numeric: boolean;
}

const initialHeadCells: HeadCell[] = [
  {
    id: 'time',
    numeric: false,
    disablePadding: false,
    label: 'Submit Time',
  },
  {
    id: 'operator',
    numeric: true,
    disablePadding: false,
    label: 'Operator',
  },
  {
    id: 'total_denomination',
    numeric: true,
    disablePadding: false,
    label: 'Total Denomination',
  },
  {
    id: 'injection_time',
    numeric: true,
    disablePadding: false,
    label: 'Injection Time',
  },
  {
    id: 'total_card',
    numeric: true,
    disablePadding: false,
    label: 'Total Card',
  },
  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status',
  },
];

export default function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort, role } = props;
  const createSortHandler = (property: keyof IData) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };
  const [headCells, setHeadCells] = useState<HeadCell[]>(initialHeadCells);

  useEffect(() => {
    if (role === 'admin') {
      // Find the index of the "Time" header
      const timeIndex = headCells.findIndex((headCell) => headCell.id === 'time');

      // If "Time" header is found, insert the "Client" header after it
      if (timeIndex !== -1) {
        setHeadCells((prevHeadCells) => {
          const newHeadCells = [...prevHeadCells];
          newHeadCells.splice(timeIndex + 1, 0, {
            id: 'client',
            numeric: true,
            disablePadding: false,
            label: 'Client',
          });
          return newHeadCells;
        });
      }
    }

    // Cleanup function to reset headCells state
    return () => {
      setHeadCells(initialHeadCells);
    };
  }, [role]);

  return (
    <TableHead className="bg-tertiary">
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            className="text-primary font-semibold"
            key={headCell.id}
            align={headCell.numeric ? 'center' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}>
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
