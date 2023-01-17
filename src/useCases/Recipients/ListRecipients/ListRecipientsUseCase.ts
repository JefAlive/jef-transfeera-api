import { IRecipientsRepository } from "../../../repositories/IRecipientsRepository";

export class ListRecipientsUseCase {
  constructor(
    private recipientsRepository: IRecipientsRepository
  ) {}

  async execute(): Promise<any> {
    return await this.recipientsRepository.list();
  }
}