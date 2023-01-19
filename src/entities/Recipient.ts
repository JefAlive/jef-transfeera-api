import { v4 as uuid } from "uuid";

export enum RecipientStatus {
  RASCUNHO = "RASCUNHO",
  VALIDADO = "VALIDADO"
}

export enum PersonNature {
  NATURAL = "NATURAL",
  LEGAL = "LEGAL"
}

export enum PixKeyType {
  CPF = "CPF",
  CNPJ = "CNPJ",
  EMAIL = "EMAIL",
  TELEFONE = "TELEFONE",
  CHAVE_ALEATORIA = "CHAVE_ALEATORIA"
}

export enum BankAccountType {
  SAVINGS_ACCOUNT,
  CHECKING_ACCOUNT
}

export class Recipient {

  public readonly id: string;

  public name?: string;
  public federalId?: string;
  public personNature?: PersonNature;
  public status?: RecipientStatus;
  public pixKey?: string;
  public pixKeyType?: PixKeyType;
  public email?: string;
  public bankAccountCode?: number;
  public bankAccountAgency?: string;
  public bankAccountNumber?: string;
  public bankAccountType?: BankAccountType;

  constructor(props: Omit<Recipient, "id">, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }

}