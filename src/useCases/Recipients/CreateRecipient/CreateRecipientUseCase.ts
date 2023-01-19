import { PersonNature, PixKeyType, Recipient, RecipientStatus } from "../../../entities/Recipient";
import { IRecipientsRepository } from "../../../repositories/IRecipientsRepository";
import { ICreateRecipientRequestDTO } from "./CreateRecipientDTO";
import { cpf, cnpj } from "cpf-cnpj-validator";
import { ValidationError } from "../../../entities/ValidationError";

export class CreateRecipientUseCase {
  constructor(
    private recipientsRepository: IRecipientsRepository
  ) {}

  async execute(data: ICreateRecipientRequestDTO) {
    const recipient = new Recipient(data);
    recipient.status = RecipientStatus.RASCUNHO;
    if (cpf.isValid(data.federalId)) {
      recipient.personNature = PersonNature.NATURAL;
    } else if (cnpj.isValid(data.federalId)) {
      recipient.personNature = PersonNature.LEGAL;
    } else {
      throw new ValidationError("invalid cpf or cnpj");
    }

    this.validateNonNullFields(data);
    this.validatePixKeyFormat(data);

    const createdRecipient = await this.recipientsRepository.save(recipient);
    return {
      recipient: createdRecipient
    };
  }

  private validateNonNullFields(data: ICreateRecipientRequestDTO) {
    if (!data.federalId) {
      throw new ValidationError("missing federalId");
    } else if (!data.name) {
      throw new ValidationError("missing name");
    } else if (!data.pixKey) {
      throw new ValidationError("missing pixKey");
    } else if (!data.pixKeyType) {
      throw new ValidationError("missing pixKeyType");
    }
  }

  private validatePixKeyFormat(data: ICreateRecipientRequestDTO) {
    const type = PixKeyType[data.pixKeyType];
    const pattern = {
      "CPF": /^[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}$/,
      "CNPJ": /^[0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2}$/,
      "EMAIL": /^[A-Z0-9+_.-]+@[A-Z0-9.-]+$/i,
      "TELEFONE": /^((?:\+?55)?)([1-9][0-9])(9[0-9]{8})$/,
      "CHAVE_ALEATORIA": /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    }[type];
    if (!pattern.exec(data.pixKey)) {
      throw new ValidationError("invalid pix key format");
    }
  }
}