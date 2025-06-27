import cors from 'cors';
import express from 'express';
import db from './src/models/index.js' // Import Sequelize DB connection
import router from './src/routers/index.js'; 
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file

const app = express();

// Configure CORS to allow requests from specific origins and methods
let corsOptions = {
  origin: process.env.CORS_ORIGIN,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
};
app.use(cors());

app.get('/', (req, res)=>{
  res.send("Welcome to my server!");
});

// middleware to route requests to the APIs
app.use(`/${process.env.URL}`, router);

// Catch-all handler for undefined routes (404 Not Found)
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});


const PORT = process.env.SERVER_PORT;
// Sync database and start server only after successful DB connection
db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
});