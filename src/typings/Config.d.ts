import { TypeMessage } from "./enums/TypesMessages";

export interface StatesConnection {
  connect: boolean;
  disconnect: boolean;
}
export interface MessageConnection {
  type: TypeMessage;
  message: string;
}
