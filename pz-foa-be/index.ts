import 'dotenv/config';
import * as express from 'express';
import { DB } from './src/utils/database/database';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World');
});

if (DB.initialize()) {
  console.log('[MAIN]: Database connected');
} else {
  console.error('Cannot connect to database, please check configuration');
}

app.listen(port, async () => {
  console.log(`[MAIN]: Listening on port ${port}`);
});
