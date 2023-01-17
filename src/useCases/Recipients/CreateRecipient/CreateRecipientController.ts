import { Context } from "koa";
import { CreateRecipientUseCase } from "./CreateRecipientUseCase";

export class CreateRecipientController {
  constructor(
    private createRecipientUseCase: CreateRecipientUseCase
  ) {}

  handle = async (ctx: Context, next: () => void) => {
    const body: any = ctx.request.body;
    const {
      name,
      federalId,
      personNature,
      status,
      pixKey,
      pixKeyType,
      email,
      bankAccountCode,
      bankAccountAgency,
      bankAccountNumber,
      bankAccountType
    } = body;

    await this.createRecipientUseCase.execute({
      name,
      federalId,
      personNature,
      status,
      pixKey,
      pixKeyType,
      email,
      bankAccountCode,
      bankAccountAgency,
      bankAccountNumber,
      bankAccountType
    });
    ctx.response.status = 201;
    
    next();
  };
}