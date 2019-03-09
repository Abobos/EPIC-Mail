import express from 'express';
import bodyParser from 'body-parser';
import router from './Server/routes/usersRoutes';


const app = express();
const PORT = process.env.port || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/auth', router);


app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening to the port ${PORT}`);
});

export default app;
