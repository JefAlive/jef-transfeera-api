import { DeleteRecipientUseCase } from "./DeleteRecipientUseCase";
import { DeleteRecipientController } from "./DeleteRecipientController";
import { PostgresRecipientsRepository } from "../../../repositories/implementations/PostgresRecipientsRepository";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();
const recipientsRepository = new PostgresRecipientsRepository(prismaClient);
const deleteRecipientUseCase = new DeleteRecipientUseCase(recipientsRepository);
const deleteRecipientController = new DeleteRecipientController(deleteRecipientUseCase);

export {
  deleteRecipientController,
  deleteRecipientUseCase
};
