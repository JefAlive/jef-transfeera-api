import { Recipient } from "../../../entities/Recipient";
import { IRecipientsRepository } from "../../../repositories/IRecipientsRepository";
import { ICreateRecipientRequestDTO } from "./CreateRecipientDTO";

export class CreateRecipientUseCase {
  constructor(
    private recipientsRepository: IRecipientsRepository
  ) {}

  async execute(data: ICreateRecipientRequestDTO) {
    const recipient = new Recipient(data);
    const createdRecipient = await this.recipientsRepository.save(recipient);
    return {
      recipient: createdRecipient
    };
  }
}