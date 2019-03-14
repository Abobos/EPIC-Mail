import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import usersRouter from './Server/routes/usersRoutes';
import messagesRouter from './Server/routes/messagesRoutes';

dotenv.config();
const app = express();
const Port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/auth', usersRouter);
app.use('/api/v1', messagesRouter);

app.listen(Port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening to the port ${Port}`);
});

export default app;
