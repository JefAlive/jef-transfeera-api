import { Recipient } from "../entities/Recipient";

export interface IRecipientsRepository {
  find(id: string): Promise<any>;
  list(): Promise<Array<any>>;
  save(recipient: Recipient): Promise<void>;
  update(id: string, recipient: Recipient): Promise<any>;
  delete(id: string): Promise<void>;
}