import express from 'express';
import bodyParser from 'body-parser';
import usersRouter from './Server/routes/usersRoutes';
import messagesRouter from './Server/routes/messagesRoutes';

const app = express();
const PORT = process.env.port || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/auth', usersRouter);
app.use('/api/v1', messagesRouter);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening to the port ${PORT}`);
});

export default app;
