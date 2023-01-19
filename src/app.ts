import Koa from "koa";
import helmet from "koa-helmet";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";

import { router } from "./routes";
import Router from "@koa/router";
import { ValidationError } from "./entities/ValidationError";

const restStatus = new Router();
restStatus.get('/status', (ctx, next) => {
  ctx.response.body = 'OK';
  next();
});

const app = new Koa();
app.use(helmet());
app.use(cors());
app.use(bodyParser());

app.use(restStatus.routes());
app.use(router.routes());

export { app };