import { Context } from "koa";
import { FindRecipientUseCase } from "./FindRecipientUseCase";
import _ from 'lodash';

export class FindRecipientController {
  constructor(
    private findRecipientUseCase: FindRecipientUseCase
  ) {}

  handle = async (ctx: Context, next: () => void) => {
    ctx.response.status = 200;
    const id = _.get(ctx, 'request.params.id');
    const recipient = await this.findRecipientUseCase.execute({ id });
    ctx.response.body = { recipient };
    next();
  };
}