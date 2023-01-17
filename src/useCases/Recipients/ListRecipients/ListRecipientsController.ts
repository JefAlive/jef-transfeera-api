import { Context } from "koa";
import { ListRecipientsUseCase } from "./ListRecipientsUseCase";

export class ListRecipientsController {
  constructor(
    private listRecipientsUseCase: ListRecipientsUseCase
  ) {}

  handle = async (ctx: Context, next: () => void) => {
    const query: any = ctx.request.query;
    const {
      name,
      status,
      pixKey,
      pixKeyType
    } = query;

    const recipients = await this.listRecipientsUseCase.execute({
      name,
      status,
      pixKey,
      pixKeyType
    });
    ctx.response.body = { recipients };
    ctx.response.status = 200;
    next();
  };
}