import { FindRecipientUseCase } from "./FindRecipientUseCase";
import { FindRecipientController } from "./FindRecipientController";
import { PostgresRecipientsRepository } from "../../../repositories/implementations/PostgresRecipientsRepository";
import prismaClient from '../../../prisma';

const recipientsRepository = new PostgresRecipientsRepository(prismaClient);
const findRecipientUseCase = new FindRecipientUseCase(recipientsRepository);
const findRecipientController = new FindRecipientController(findRecipientUseCase);

export {
  findRecipientController,
  findRecipientUseCase
};
