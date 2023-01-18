import { IRecipientsRepository } from "../../../repositories/IRecipientsRepository";
import { IListRecipientRequestDTO } from "./ListRecipientsDTO";

export class ListRecipientsUseCase {
  constructor(
    private recipientsRepository: IRecipientsRepository
  ) {}

  async execute(filters: IListRecipientRequestDTO): Promise<any> {
    this.validatePageNumber(filters.page);

    const take = 10;
    const skip = (Number(filters.page) - 1) * take;
    const totalRows = await this.recipientsRepository.count(filters);
    const totalPages = Math.ceil(totalRows / take);
    this.validatePageIsInRange(filters.page, totalPages);

    const recipients = await this.recipientsRepository.list(filters, take, skip);
    return {
      recipients,
      totalRows,
      totalPages
    }
  }

  private validatePageNumber(page: bigint) {
    if (page < 1) {
      throw new Error('invalid page number, must be at least 1');
    }
  }

  private validatePageIsInRange(page: bigint, totalPages: number) {
    if (page > 1 && page > totalPages) {
      throw new Error('exceeded valid page numbers, totalPages is ' + totalPages);
    }
  }
}