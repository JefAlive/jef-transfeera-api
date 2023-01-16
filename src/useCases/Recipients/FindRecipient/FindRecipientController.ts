import { Context } from "koa";

export class FindRecipientController {
  async handle(ctx: Context, next: Function) {
    ctx.response.status = 200;
    await next()
  }
}