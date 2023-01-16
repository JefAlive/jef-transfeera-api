import Koa from 'koa';
import helmet from 'koa-helmet';
import cors from '@koa/cors';

const app = new Koa();
app.use(helmet());
app.use(cors());

export { app };