import Koa from "koa";
import helmet from "koa-helmet";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";

import { router } from "./routes";

const app = new Koa();
app.use(helmet());
app.use(cors());
app.use(bodyParser());

app.use(router.routes());

export { app };