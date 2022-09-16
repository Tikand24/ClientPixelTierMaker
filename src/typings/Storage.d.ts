export interface Storage {
  _id: string;
  createdAt: Date;
  deleted: boolean;
  updatedAt: Date;
  url: string;
}
export interface StorageResponse{
    data:Storage[]
}