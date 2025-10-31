import express, { Express } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import apiRoutes from './routes/api';

dotenv.config();

const app: Express = express();
const PORT: number = parseInt(process.env.PORT || '3000');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'EADDRINUSE') {
      console.log(`Port ${PORT} is busy, trying ${PORT + 1}...`);
      app.listen(PORT + 1, () => {
        console.log(`Server is running on http://localhost:${PORT + 1}`);
      });
    } else {
      console.error('Server failed to start:', error);
    }
  }
};

startServer();

export default app;