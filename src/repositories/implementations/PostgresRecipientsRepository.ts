import { Recipient } from "src/entities/Recipient";
import { IRecipientsRepository } from "../IRecipientsRepository";
import { PrismaClient } from "@prisma/client";
import { IListRecipientRequestDTO } from "src/useCases/Recipients/ListRecipients/ListRecipientsDTO";

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
  async list(filters: IListRecipientRequestDTO): Promise<Array<any>> {
    const where = {
      deleted: false,
      status: filters.status,
      pixKeyType: filters.pixKeyType,
      name: {
        contains: filters.name
      },
      pixKey: {
        contains: filters.pixKey
      }
    }
    const list = await this.prisma.recipient.findMany({
      where: where,
      orderBy: {
        createdAt: 'asc'
      },
      take: 10,
      skip: 0
    });
    const count = await this.prisma.recipient.count({
      where: where
    })
    return list;
  }
  async save(recipient: Recipient): Promise<void> {
    await this.prisma.recipient.create({
      data: {
        id: recipient.id,
        name: recipient.name,
        federalId: recipient.federalId,
        personNature: String(recipient.personNature),
        status: String(recipient.status),
        pixKey: recipient.pixKey,
        pixKeyType: String(recipient.pixKeyType),
        email: recipient.email,
        bankAccountCode: String(recipient.bankAccountCode),
        bankAccountAgency: recipient.bankAccountAgency,
        bankAccountNumber: recipient.bankAccountNumber,
        bankAccountType: String(recipient.bankAccountType)
      }
    })
  }
  async update(id: string, recipient: Recipient): Promise<any> {
    return await this.prisma.recipient.update({
      where: {
        id: id
      },
      data: {
        name: recipient.name,
        federalId: recipient.federalId,
        personNature: String(recipient.personNature),
        status: String(recipient.status),
        pixKey: recipient.pixKey,
        pixKeyType: String(recipient.pixKeyType),
        email: recipient.email,
        bankAccountCode: String(recipient.bankAccountCode),
        bankAccountAgency: recipient.bankAccountAgency,
        bankAccountNumber: recipient.bankAccountNumber,
        bankAccountType: String(recipient.bankAccountType)
      }
    })
  }
  async delete(id: string): Promise<void> {
    await this.prisma.recipient.update({
      where: {
        id: id
      },
      data: {
        deleted: true
      }
    })
  }
  async deleteMany(ids: Array<string>): Promise<void> {
    await this.prisma.recipient.updateMany({
      where: {
        id: {
          in: ids
        }
      },
      data: {
        deleted: true
      }
    })
  }
}