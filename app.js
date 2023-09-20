// app.js
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes.js';
import databaseConfig from './config/database.js';

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB using Promises
mongoose
  .connect(databaseConfig.uri, databaseConfig.options)
  .then(() => {
    console.log('Connected to MongoDB');

    // Set up routes and start the server only when MongoDB is connected
    app.use(bodyParser.json());
    app.use('/user',userRoutes);

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });
