import { Item } from './Item';

export interface Tier {
  id: number;
  name: string;
  order: number;
  color: string;
  itemSelected: Item[];
}
