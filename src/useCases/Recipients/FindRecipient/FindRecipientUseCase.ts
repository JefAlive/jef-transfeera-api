import { IRecipientsRepository } from "../../../repositories/IRecipientsRepository";
import { IFindRecipientRequestDTO } from "./FindRecipientDTO";

export class FindRecipientUseCase {
  constructor(
    private recipientsRepository: IRecipientsRepository
  ) {}

  async execute(data: IFindRecipientRequestDTO): Promise<any> {
    return await this.recipientsRepository.find(data.id);
  }
}