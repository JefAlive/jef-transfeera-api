import { IRecipientsRepository } from "src/repositories/IRecipientsRepository";
import { IDeleteRecipientRequestDTO } from "./DeleteRecipientDTO";
import { version as uuidVersion } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import { ValidationError } from "../../../../src/entities/ValidationError";

export class DeleteRecipientUseCase {
  constructor(
    private recipientsRepository: IRecipientsRepository
  ) {}

  async execute(data: IDeleteRecipientRequestDTO): Promise<void> {
    this.validateIsUuidV4(data.id);
    return await this.recipientsRepository.delete(data.id);
  }

  private validateIsUuidV4(uuid: string) {
    if (!uuidValidate(uuid) || uuidVersion(uuid) !== 4) {
      throw new ValidationError('invalid uuid');
    }
  }
}