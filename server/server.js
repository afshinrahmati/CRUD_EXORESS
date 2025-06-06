import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

import authRoutes from './src/api/routes/auth.routes.js';
import taskRoutes from './src/api/routes/task.routes.js';
import { notFound, errorHandler } from './src/api/middleware/error.middleware.js';
import connectDB from './src/config/db.config.js';
import logger from './src/utils/logger.js';

dotenv.config({ path: '.env.dev' });

const app = express();

// Swagger config
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task API',
      version: '1.0.0',
      description: 'A simple task management API',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
        components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ['./src/api/routes/*.js'], // <-- Point to route files
});

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// 🔥 Swagger route (MUST be before notFound)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error handlers
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
connectDB().then(() => {
  app.listen(PORT, () => {
    logger.info(`🚀 Server running on http://localhost:${PORT}`);
    logger.info(`🚀 Swagger running on http://localhost:${PORT}/api-docs`);
  });
});
