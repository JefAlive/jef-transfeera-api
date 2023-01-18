export interface IListRecipientRequestDTO {

  name: string;
  status: string;
  pixKey: string;
  pixKeyType: string;
  page: number;

}

export interface IListRecipientPaginatedResponseDTO {

  totalPages: number;
  totalRows: number;
  recipients: Array<any>;

}