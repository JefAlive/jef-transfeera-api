import { IListRecipientPaginatedResponseDTO, IListRecipientRequestDTO } from "src/useCases/Recipients/ListRecipients/ListRecipientsDTO";
import { Recipient } from "../entities/Recipient";

export interface IRecipientsRepository {
  find(id: string): Promise<any>;
  list(filters: IListRecipientRequestDTO, take: number, skip: number): Promise<Array<any>>;
  count(filters: IListRecipientRequestDTO): Promise<number>;
  save(recipient: Recipient): Promise<any>;
  update(id: string, recipient: Recipient): Promise<any>;
  delete(id: string): Promise<void>;
  deleteMany(id: Array<string>): Promise<void>;
}