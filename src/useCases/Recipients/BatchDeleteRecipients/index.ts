import { BatchDeleteRecipientsUseCase } from "./BatchDeleteRecipientsUseCase";
import { BatchDeleteRecipientsController } from "./BatchDeleteRecipientsController";
import { PostgresRecipientsRepository } from "../../../repositories/implementations/PostgresRecipientsRepository";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();
const recipientsRepository = new PostgresRecipientsRepository(prismaClient);
const batchDeleteRecipientsUseCase = new BatchDeleteRecipientsUseCase(recipientsRepository);
const batchDeleteRecipientsController = new BatchDeleteRecipientsController(batchDeleteRecipientsUseCase);

export {
  batchDeleteRecipientsController,
  batchDeleteRecipientsUseCase
};
