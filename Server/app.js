import '@babel/polyfill';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRouter from './routes/userRoute';
import messageRouter from './routes/messageRoute';
import groupRouter from './routes/groupRoute';

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => res.json({ message: 'Welcome to EPIC Mail' }));

app.use('/api/v1/auth', userRouter);
app.use('/api/v1', messageRouter);
app.use('/api/v1', groupRouter);
app.get('/api/v1/docs', (req, res) => res.redirect('https://epicmail11.docs.apiary.io/#'));
app.all('*', (req, res) => res.status(404).json({
  status: '404',
  error: 'This route is unavailable',
}));

app.listen(port, () => {
  console.log(`Listening to the port ${port}`);
});

export default app;
