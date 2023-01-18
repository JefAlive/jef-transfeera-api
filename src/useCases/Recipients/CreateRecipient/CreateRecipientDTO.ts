import { PixKeyType } from "../../../entities/Recipient";

export interface ICreateRecipientRequestDTO {

  name: string;
  federalId: string;
  pixKey: string;
  pixKeyType: PixKeyType;
  email: string;

}