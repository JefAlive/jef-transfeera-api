import { Context } from "koa";

export class EditRecipientController {
  handle = async (ctx: Context, next: () => void) => {
    ctx.response.status = 200;
    await next();
  };
}