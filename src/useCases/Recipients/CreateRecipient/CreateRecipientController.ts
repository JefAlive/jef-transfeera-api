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
      pixKey,
      pixKeyType,
      email
    } = body;

    const recipient = await this.createRecipientUseCase.execute({
      name,
      federalId,
      pixKey,
      pixKeyType,
      email
    });
    ctx.response.body = recipient;
    ctx.response.status = 201;
    
    next();
  };
}