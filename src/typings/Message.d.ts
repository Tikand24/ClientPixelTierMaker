import { Tier } from './Tier';
export interface Message {
    message: string;
    tier: Tier;
    username?:string;
  }
  export interface MessageResponse {
    message: string;
    username: string;
  }