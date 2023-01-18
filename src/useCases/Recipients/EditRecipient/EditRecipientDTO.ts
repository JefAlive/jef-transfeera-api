import { PixKeyType } from "../../../entities/Recipient";

export interface IEditRecipientRequestDTO {

  name: string;
  federalId: string;
  pixKey: string;
  pixKeyType: PixKeyType;
  email: string;

}