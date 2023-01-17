import { FindRecipientUseCase } from "./FindRecipientUseCase";
import { FindRecipientController } from "./FindRecipientController";
import { PostgresRecipientsRepository } from "../../../repositories/implementations/PostgresRecipientsRepository";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();
const recipientsRepository = new PostgresRecipientsRepository(prismaClient);
const findRecipientUseCase = new FindRecipientUseCase(recipientsRepository);
const findRecipientController = new FindRecipientController(findRecipientUseCase);

export {
  findRecipientController,
  findRecipientUseCase
};
