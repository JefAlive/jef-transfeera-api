import { Context } from "koa";
import { EditRecipientUseCase } from "./EditRecipientUseCase";
import _ from "lodash";
import { PixKeyType } from "src/entities/Recipient";
import { ValidationError } from "../../../entities/ValidationError";

export class EditRecipientController {
  constructor(
    private editRecipientUseCase: EditRecipientUseCase
  ) {}

  handle = async (ctx: Context, next: () => void) => {
    const id = _.get(ctx, "request.params.id");
    const body: any = ctx.request.body;
    const {
      name,
      federalId,
      pixKey,
      pixKeyType,
      email
    } = body;

    const recipient = await this.editRecipientUseCase.execute({
      id,
      name,
      federalId,
      pixKey,
      pixKeyType: pixKeyType as PixKeyType,
      email
    });
    ctx.response.body = {
      recipient
    };
    ctx.response.status = 200;
    next();
  };
}