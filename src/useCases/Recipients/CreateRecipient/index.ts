import { CreateRecipientUseCase } from "./CreateRecipientUseCase";
import { CreateRecipientController } from "./CreateRecipientController";
import { PostgresRecipientsRepository } from "../../../repositories/implementations/PostgresRecipientsRepository";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();
const recipientsRepository = new PostgresRecipientsRepository(prismaClient);
const createRecipientUseCase = new CreateRecipientUseCase(recipientsRepository);
const createRecipientController = new CreateRecipientController(createRecipientUseCase);

export {
  createRecipientUseCase,
  createRecipientController
};