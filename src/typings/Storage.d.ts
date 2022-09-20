export interface Storage {
  _id: string;
  createdAt: Date;
  deleted: boolean;
  updatedAt: Date;
  filename:string;
  url: string;
}
export interface StorageResponse{
    data:Storage[]
}