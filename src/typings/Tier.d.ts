import { Item } from './Item';

export interface Tier {
  _id: number;
  name: string;
  order: number;
  color: string;
  itemSelected: Item[];
}
export interface TierRequest {
  name: string;
  order: number;
  color: string;
}
