import { Context } from "koa";
import { DeleteRecipientUseCase } from "./DeleteRecipientUseCase";
import _ from 'lodash';

export class DeleteRecipientController {
  constructor(
    private deleteRecipientUseCase: DeleteRecipientUseCase
  ) {}

  handle = async (ctx: Context, next: () => void) => {
    const id = _.get(ctx, 'request.params.id');
    await this.deleteRecipientUseCase.execute({ id });
    ctx.response.status = 200;
    next();
  };
}