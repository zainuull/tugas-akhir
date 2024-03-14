import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';

export type Order = 'asc' | 'desc';

export interface Data {
  id: number;
  phone: string;
  end_user: string;
  region: string;
  status: string;
  quota: string;
  quota_expired: string;
  cycle: number;
  activation_status: boolean;
}

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'phone',
    numeric: false,
    disablePadding: false,
    label: 'MSISDN',
  },
  {
    id: 'end_user',
    numeric: true,
    disablePadding: false,
    label: 'Client',
  },
  {
    id: 'region',
    numeric: true,
    disablePadding: false,
    label: 'Region',
  },
  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'SIM Status',
  },
  {
    id: 'quota',
    numeric: true,
    disablePadding: false,
    label: 'Quota',
  },
  {
    id: 'quota_expired',
    numeric: true,
    disablePadding: false,
    label: 'Quota Expired',
  },
  {
    id: 'cycle',
    numeric: true,
    disablePadding: false,
    label: 'Cycle',
  },
  {
    id: 'activation_status',
    numeric: true,
    disablePadding: false,
    label: 'Activation Status',
  },
];

export default function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead className="bg-tertiary">
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            className="text-primary font-semibold text-xs"
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
