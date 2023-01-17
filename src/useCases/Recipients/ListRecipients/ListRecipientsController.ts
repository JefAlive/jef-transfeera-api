import { Context } from "koa";
import { ListRecipientsUseCase } from "./ListRecipientsUseCase";

export class ListRecipientsController {
  constructor(
    private listRecipientsUseCase: ListRecipientsUseCase
  ) {}

  handle = async (ctx: Context, next: () => void) => {
    ctx.response.status = 200;
    const recipients = await this.listRecipientsUseCase.execute();
    ctx.response.body = { recipients };
    next();
  };
}