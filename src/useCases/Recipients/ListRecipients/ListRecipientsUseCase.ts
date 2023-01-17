import { IRecipientsRepository } from "../../../repositories/IRecipientsRepository";
import { IListRecipientRequestDTO } from "./ListRecipientsDTO";

export class ListRecipientsUseCase {
  constructor(
    private recipientsRepository: IRecipientsRepository
  ) {}

  async execute(filters: IListRecipientRequestDTO): Promise<any> {
    return await this.recipientsRepository.list(filters);
  }
}