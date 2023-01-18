import { IRecipientsRepository } from "src/repositories/IRecipientsRepository";
import { IDeleteRecipientRequestDTO } from "./DeleteRecipientDTO";

export class DeleteRecipientUseCase {
  constructor(
    private recipientsRepository: IRecipientsRepository
  ) {}

  async execute(data: IDeleteRecipientRequestDTO): Promise<any> {
    return await this.recipientsRepository.delete(data.id);
  }
}