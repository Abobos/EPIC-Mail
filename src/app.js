import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import usersRouter from './Server/routes/usersRoutes';
import messagesRouter from './Server/routes/messagesRoutes';

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Welcome to EPIC Mail');
});
app.use('/api/v1/auth', usersRouter);
app.use('/api/v1', messagesRouter);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening to the port ${port}`);
});

export default app;
