import { uuid } from 'uuidv4';

export enum RecipientStatus {
  RASCUNHO,
  VALIDADO
}

export enum PersonNature {
  NATURAL,
  LEGAL
}

export enum PixKeyType {
  CPF,
  CNPJ,
  EMAIL,
  TELEFONE,
  CHAVE_ALEATORIA
}

export enum BankAccountType {
  SAVINGS_ACCOUNT,
  CHECKING_ACCOUNT
}

export class Recipient {

  public readonly id: string;

  public name: string;
  public federalId: string;
  public personNature: PersonNature;
  public status: RecipientStatus;
  public pixKey: string;
  public pixKeyType: PixKeyType;
  public email: string;
  public type: PixKeyType;
  public bankAccountCode: number;
  public bankAccountAgency: string;
  public bankAccountNumber: string;
  public bankAccountType: BankAccountType;

  constructor(props: Omit<Recipient, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }

}