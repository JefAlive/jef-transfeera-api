import { IRecipientsRepository } from "src/repositories/IRecipientsRepository";
import { IBatchDeleteRecipientRequestDTO } from "./BatchDeleteRecipientsDTO";
import { version as uuidVersion } from 'uuid';
import { validate as uuidValidate } from 'uuid';

export class BatchDeleteRecipientsUseCase {
  constructor(
    private recipientsRepository: IRecipientsRepository
  ) {}

  async execute(data: IBatchDeleteRecipientRequestDTO): Promise<void> {
    (data.ids || []).forEach((id) => {
      this.validateIsUuidV4(id);
    })
    await this.recipientsRepository.deleteMany(data.ids);
  }

  private validateIsUuidV4(uuid: string) {
    if (!uuidValidate(uuid) || uuidVersion(uuid) !== 4) {
      throw Error('invalid uuid');
    }
  }
}