import { Recipient } from "../entities/Recipient";

export interface IRecipientsRepository {
  find(id: string): Promise<Recipient>;
  save(recipient: Recipient): Promise<void>;
  update(id: string, recipient: Recipient): Promise<Recipient>;
  delete(id: string): Promise<void>;
}