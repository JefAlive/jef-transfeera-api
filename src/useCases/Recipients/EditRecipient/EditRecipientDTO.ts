import { PixKeyType } from "../../../entities/Recipient";

export interface IEditRecipientRequestDTO {

  id: string;
  name: string;
  federalId: string;
  pixKey: string;
  pixKeyType: PixKeyType;
  email: string;

}