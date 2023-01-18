export interface IListRecipientRequestDTO {

  name?: string;
  status?: string;
  pixKey?: string;
  pixKeyType?: string;
  page: bigint;

}

export interface IListRecipientPaginatedResponseDTO {

  totalPages: bigint;
  totalRows: bigint;
  recipients: Array<any>;

}