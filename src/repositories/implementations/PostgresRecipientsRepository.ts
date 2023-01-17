import { Recipient } from "src/entities/Recipient";
import { IRecipientsRepository } from "../IRecipientsRepository";
import { PrismaClient } from "@prisma/client";

export class PostgresRecipientsRepository implements IRecipientsRepository {
  constructor(
    private prisma: PrismaClient
  ) {}

  async find(id: string): Promise<any> {
    return await this.prisma.recipient.findUnique({
      where: {
        id: id
      }
    });
  }
  async list(): Promise<Array<any>> {
    const list = await this.prisma.recipient.findMany();
    return list;
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