import { Context } from "koa";
import { BatchDeleteRecipientsUseCase } from "./BatchDeleteRecipientsUseCase";

export class BatchDeleteRecipientsController {
  constructor(
    private batchDeleteRecipientsUseCase: BatchDeleteRecipientsUseCase
  ) {}

  handle = async (ctx: Context, next: () => void) => {
    const body: any = ctx.request.body;
    const {
      ids
    } = body;

    await this.batchDeleteRecipientsUseCase.execute({ ids });
    ctx.response.status = 200;
    await next();
  };
}