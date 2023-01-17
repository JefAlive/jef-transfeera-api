import { Context } from "koa";
import { FindRecipientUseCase } from "./FindRecipientUseCase";

export class FindRecipientController {
  constructor(
    private findRecipientUseCase: FindRecipientUseCase
  ) {}

  handle = async (ctx: Context, next: () => void) => {
    ctx.response.status = 200;
    const id = String(ctx.request.query.id);
    const recipient = await this.findRecipientUseCase.execute({ id });
    ctx.response.body = { recipient };
    next();
  };
}