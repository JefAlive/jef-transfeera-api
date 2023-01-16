import { config } from './config';
import { app } from './app';

app.listen(config.port, () => {
  console.log(`Running on port ${config.port}`);
});