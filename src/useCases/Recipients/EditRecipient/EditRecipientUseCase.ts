import { Recipient, RecipientStatus } from "../../../entities/Recipient";
import { IRecipientsRepository } from "../../../repositories/IRecipientsRepository";
import { IEditRecipientRequestDTO } from "./EditRecipientDTO";
import { version as uuidVersion } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import { ValidationError } from "../../../../src/entities/ValidationError";

export class EditRecipientUseCase {
  constructor(
    private recipientsRepository: IRecipientsRepository
  ) {}

  async execute(data: IEditRecipientRequestDTO) {
    const recipient = new Recipient(data, data.id);

    this.validateIsUuidV4(data.id);
    await this.validateOnlyChangeEmailWhenStatusValidated(data);

    return await this.recipientsRepository.update(data.id, recipient);
  }

  private validateIsUuidV4(uuid: string) {
    if (!uuidValidate(uuid) || uuidVersion(uuid) !== 4) {
      throw new ValidationError('invalid uuid');
    }
  }

  private async validateOnlyChangeEmailWhenStatusValidated(data: IEditRecipientRequestDTO) {
    const recipient = await this.recipientsRepository.find(data.id);
    if (recipient.status === 'VALIDADO') {
      if (data.federalId || data.name || data.pixKey || data.pixKeyType?.toString() ) {
        throw new ValidationError('only allowed to change is email');
      }
    }
  }
}