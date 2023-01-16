import { CreateRecipientUseCase } from "./CreateRecipientUseCase";
import { CreateRecipientController } from "./CreateRecipientController";
import { PostgresRecipientsRepository } from "../../../repositories/implementations/PostgresRecipientsRepository";

const recipientsRepository = new PostgresRecipientsRepository();
const createRecipientUseCase = new CreateRecipientUseCase(recipientsRepository);
const createRecipientController = new CreateRecipientController(createRecipientUseCase);

export {
  createRecipientUseCase,
  createRecipientController
};