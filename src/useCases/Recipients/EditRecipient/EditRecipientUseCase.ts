import { Recipient } from "../../../entities/Recipient";
import { IRecipientsRepository } from "../../../repositories/IRecipientsRepository";
import { IEditRecipientRequestDTO } from "./EditRecipientDTO";

export class EditRecipientUseCase {
  constructor(
    private recipientsRepository: IRecipientsRepository
  ) {}

  async execute(data: IEditRecipientRequestDTO) {
    const recipient = new Recipient(data);
    return await this.recipientsRepository.update(data.id, recipient);
  }
}