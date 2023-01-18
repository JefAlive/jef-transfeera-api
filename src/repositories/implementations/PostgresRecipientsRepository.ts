import { Recipient } from "src/entities/Recipient";
import { IRecipientsRepository } from "../IRecipientsRepository";
import { Prisma, PrismaClient } from "@prisma/client";
import { IListRecipientRequestDTO } from "src/useCases/Recipients/ListRecipients/ListRecipientsDTO";

export class PostgresRecipientsRepository implements IRecipientsRepository {
  constructor(
    private prisma: PrismaClient
  ) {}

  async find(id: string): Promise<any> {
    return await this.prisma.recipient.findUniqueOrThrow({
      where: {
        id: id
      }
    });
  }
  async list(filters: IListRecipientRequestDTO, take: number, skip: number): Promise<Array<any>> {
    return await this.prisma.recipient.findMany({
      where: {
        deleted: false,
        status: filters.status,
        pixKeyType: filters.pixKeyType
      },
      orderBy: {
        createdAt: 'asc'
      },
      take: take,
      skip: skip
    });
  }
  async count(filters: IListRecipientRequestDTO): Promise<number> {
    return await this.prisma.recipient.count({
      where: {
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
    })
  }
  async save(recipient: Recipient): Promise<any> {
    return await this.prisma.recipient.create({
      data: {
        id: recipient.id,
        name: String(recipient.name),
        federalId: String(recipient.federalId),
        personNature: String(recipient.personNature),
        status: String(recipient.status),
        pixKey: String(recipient.pixKey),
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
        personNature: recipient.personNature,
        pixKey: recipient.pixKey,
        pixKeyType: recipient.pixKeyType,
        email: recipient.email
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