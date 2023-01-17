import { Context } from "koa";

export class DeleteRecipientController {
  handle = async (ctx: Context, next: () => void) => {
    ctx.response.status = 200;
    await next();
  };
}