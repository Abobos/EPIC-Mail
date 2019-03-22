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

app.get('/', (req, res) => res.json({ message: 'Welcome to EPIC Mail' }));

app.use('/api/v1/auth', usersv1Router);
app.use('/api/v1', messagesv1Router);
app.get('/api/v1/docs', (req, res) => res.redirect('https://epicmail11.docs.apiary.io/#'));
app.all('*', (req, res) => res.status(404).json({
  status: '404',
  error: 'This route is unavailable',
}));

app.listen(Port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening to the port ${Port}`);
});

export default app;
