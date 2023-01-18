import { EditRecipientUseCase } from "./EditRecipientUseCase";
import { EditRecipientController } from "./EditRecipientController";
import { PostgresRecipientsRepository } from "../../../repositories/implementations/PostgresRecipientsRepository";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();
const recipientsRepository = new PostgresRecipientsRepository(prismaClient);
const editRecipientUseCase = new EditRecipientUseCase(recipientsRepository);
const editRecipientController = new EditRecipientController(editRecipientUseCase);

export {
  editRecipientUseCase,
  editRecipientController
};