import { Recipient } from "src/entities/Recipient";
import { IRecipientsRepository } from "../IRecipientsRepository";

export class PostgresRecipientsRepository implements IRecipientsRepository {
  find(id: string): Promise<Recipient> {
    throw new Error("Method not implemented.");
  }
  save(recipient: Recipient): Promise<void> {
    throw new Error("Method not implemented.");
  }
  update(id: string, recipient: Recipient): Promise<Recipient> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

}