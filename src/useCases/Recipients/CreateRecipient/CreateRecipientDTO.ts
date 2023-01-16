import { BankAccountType, PersonNature, PixKeyType, RecipientStatus } from "../../../entities/Recipient";

export interface ICreateRecipientRequestDTO {

  name: string;
  federalId: string;
  personNature: PersonNature;
  status: RecipientStatus;
  pixKey: string;
  pixKeyType: PixKeyType;
  email: string;
  type: PixKeyType;
  bankAccountCode: number;
  bankAccountAgency: string;
  bankAccountNumber: string;
  bankAccountType: BankAccountType;

}