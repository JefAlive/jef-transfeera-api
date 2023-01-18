import { IRecipientsRepository } from "../../../repositories/IRecipientsRepository";
import { IListRecipientRequestDTO } from "./ListRecipientsDTO";

export class ListRecipientsUseCase {
  constructor(
    private recipientsRepository: IRecipientsRepository
  ) {}

  async execute(filters: IListRecipientRequestDTO): Promise<any> {
    const take = 10;
    const skip = (filters.page - 1) * take;
    const recipients = await this.recipientsRepository.list(filters, take, skip);
    const totalRows = await this.recipientsRepository.count(filters);
    const totalPages = Math.ceil(totalRows / take);
    return {
      recipients,
      totalRows,
      totalPages
    }
  }
}