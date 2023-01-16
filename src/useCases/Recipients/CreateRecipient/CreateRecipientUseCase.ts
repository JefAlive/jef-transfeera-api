import { Recipient } from "../../../entities/Recipient"
import { IRecipientsRepository } from "../../../repositories/IRecipientsRepository"
import { ICreateRecipientRequestDTO } from "./CreateRecipientDTO"

export class CreateRecipientUseCase {
  constructor(
    private recipientsRepository: IRecipientsRepository
  ) {}

  async execute(data: ICreateRecipientRequestDTO) {
    const recipient = new Recipient(data);
    await this.recipientsRepository.save(recipient);
  }
}