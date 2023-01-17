import { IListRecipientRequestDTO } from "src/useCases/Recipients/ListRecipients/ListRecipientsDTO";
import { Recipient } from "../entities/Recipient";

export interface IRecipientsRepository {
  find(id: string): Promise<any>;
  list(filters: IListRecipientRequestDTO): Promise<Array<any>>;
  save(recipient: Recipient): Promise<void>;
  update(id: string, recipient: Recipient): Promise<any>;
  delete(id: string): Promise<void>;
  deleteMany(id: Array<string>): Promise<void>;
}