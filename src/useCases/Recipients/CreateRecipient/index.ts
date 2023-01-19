import { CreateRecipientUseCase } from "./CreateRecipientUseCase";
import { CreateRecipientController } from "./CreateRecipientController";
import { PostgresRecipientsRepository } from "../../../repositories/implementations/PostgresRecipientsRepository";
import prismaClient from "../../../prisma";

const recipientsRepository = new PostgresRecipientsRepository(prismaClient);
const createRecipientUseCase = new CreateRecipientUseCase(recipientsRepository);
const createRecipientController = new CreateRecipientController(createRecipientUseCase);

export {
  createRecipientUseCase,
  createRecipientController
};