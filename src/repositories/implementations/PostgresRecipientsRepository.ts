import { Recipient } from "src/entities/Recipient";
import { IRecipientsRepository } from "../IRecipientsRepository";

export class PostgresRecipientsRepository implements IRecipientsRepository {
  async find(id: string): Promise<Recipient> {
    throw new Error("Method not implemented.");
  }
  async save(recipient: Recipient): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async update(id: string, recipient: Recipient): Promise<Recipient> {
    throw new Error("Method not implemented.");
  }
  async delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}