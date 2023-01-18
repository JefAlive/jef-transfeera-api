import { PersonNature, Recipient, RecipientStatus } from "../../../entities/Recipient";
import { IRecipientsRepository } from "../../../repositories/IRecipientsRepository";
import { ICreateRecipientRequestDTO } from "./CreateRecipientDTO";
import { cpf, cnpj } from 'cpf-cnpj-validator';

export class CreateRecipientUseCase {
  constructor(
    private recipientsRepository: IRecipientsRepository
  ) {}

  async execute(data: ICreateRecipientRequestDTO) {
    const recipient = new Recipient(data);
    recipient.status = RecipientStatus.RASCUNHO;
    if (cpf.isValid(data.federalId)) {
      recipient.personNature = PersonNature.NATURAL
    } else if (cnpj.isValid(data.federalId)) {
      recipient.personNature = PersonNature.LEGAL
    } else {
      throw new Error('invalid cpf or cnpj');
    }

    const createdRecipient = await this.recipientsRepository.save(recipient);
    return {
      recipient: createdRecipient
    };
  }
}