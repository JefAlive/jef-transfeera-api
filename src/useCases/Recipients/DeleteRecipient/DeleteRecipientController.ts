import { Context } from "koa";

export class DeleteRecipientController {
  async handle(ctx: Context, next: Function) {
    ctx.response.status = 200;
    await next()
  }
}