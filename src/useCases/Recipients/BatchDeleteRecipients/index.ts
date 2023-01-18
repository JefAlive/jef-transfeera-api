import { BatchDeleteRecipientsUseCase } from "./BatchDeleteRecipientsUseCase";
import { BatchDeleteRecipientsController } from "./BatchDeleteRecipientsController";
import { PostgresRecipientsRepository } from "../../../repositories/implementations/PostgresRecipientsRepository";
import prismaClient from '../../../prisma';

const recipientsRepository = new PostgresRecipientsRepository(prismaClient);
const batchDeleteRecipientsUseCase = new BatchDeleteRecipientsUseCase(recipientsRepository);
const batchDeleteRecipientsController = new BatchDeleteRecipientsController(batchDeleteRecipientsUseCase);

export {
  batchDeleteRecipientsController,
  batchDeleteRecipientsUseCase
};
