import { ListRecipientsUseCase } from "./ListRecipientsUseCase";
import { ListRecipientsController } from "./ListRecipientsController";
import { PostgresRecipientsRepository } from "../../../repositories/implementations/PostgresRecipientsRepository";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();
const recipientsRepository = new PostgresRecipientsRepository(prismaClient);
const listRecipientsUseCase = new ListRecipientsUseCase(recipientsRepository);
const listRecipientsController = new ListRecipientsController(listRecipientsUseCase);

export {
  listRecipientsController,
  listRecipientsUseCase
};
