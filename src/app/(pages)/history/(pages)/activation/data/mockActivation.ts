import { IData } from '../domain/model/model';

export const mockActivation: IData[] = [
  {
    id: 1,
    time: '2023-12-21 08:36:56',
    client: 'Inzaghi',
    operator: 'Telkomsel',
    total_card_to_activate: 700,
    total_card_activated: 20000,
    status: 'Success',
  },
  {
    id: 2,
    time: '2023-12-29 08:36:56',
    client: 'Easy Go',
    operator: 'XL',
    total_card_to_activate: 800,
    total_card_activated: 200000,
    status: 'Success',
  },
];
