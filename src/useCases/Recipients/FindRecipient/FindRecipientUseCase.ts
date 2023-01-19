import { IRecipientsRepository } from "../../../repositories/IRecipientsRepository";
import { IFindRecipientRequestDTO } from "./FindRecipientDTO";
import { version as uuidVersion } from "uuid";
import { validate as uuidValidate } from "uuid";
import { ValidationError } from "../../../entities/ValidationError";

export class FindRecipientUseCase {
  constructor(
    private recipientsRepository: IRecipientsRepository
  ) {}

  async execute(data: IFindRecipientRequestDTO): Promise<any> {
    this.validateIsUuidV4(data.id);
    return await this.recipientsRepository.find(data.id);
  }

  private validateIsUuidV4(uuid: string) {
    if (!uuidValidate(uuid) || uuidVersion(uuid) !== 4) {
      throw new ValidationError("invalid uuid");
    }
  }
}