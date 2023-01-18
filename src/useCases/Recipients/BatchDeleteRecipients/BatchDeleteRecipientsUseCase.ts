import { IRecipientsRepository } from "src/repositories/IRecipientsRepository";
import { IBatchDeleteRecipientRequestDTO } from "./BatchDeleteRecipientsDTO";

export class BatchDeleteRecipientsUseCase {
  constructor(
    private recipientsRepository: IRecipientsRepository
  ) {}

  async execute(data: IBatchDeleteRecipientRequestDTO) {
    await this.recipientsRepository.deleteMany(data.ids);
  }
}