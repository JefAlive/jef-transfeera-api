import { Context } from "koa";
import { CreateRecipientUseCase } from './CreateRecipientUseCase'

export class CreateRecipientController {
  constructor(
    private createRecipientUseCase: CreateRecipientUseCase
  ) {}

  async handle(ctx: Context, next: Function) {
    ctx.response.status = 201;
    await next()
  }
}