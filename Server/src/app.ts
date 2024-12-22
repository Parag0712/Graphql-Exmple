import dotenv from 'dotenv';

import { connectGraphql } from './graphql/graphql.js';
import { errorMiddleware } from './middlewares/error.js';
import express, { NextFunction, Request, Response } from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import morgan from 'morgan';
import { connectDB } from './database/database.js';

dotenv.config({ path: './.env', });

export const envMode = process.env.NODE_ENV?.trim() || 'DEVELOPMENT';
const port = Number(process.env.PORT) || 3000;
connectDB(process.env.MONGODB_URI!)

const app = express();
const graphqlserver = connectGraphql(port, envMode);
await graphqlserver.start();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: ' * ', credentials: true }));
app.use(morgan('dev'))

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  (req as any).user = { role: "admin" };
  const role = (req as any).user.role || "admin";
  if (role === "admin") {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
}

app.use("/graphql",isAdmin, expressMiddleware(graphqlserver, {
  context: async ({ req }) => {
    return { headers: req.headers, user: (req as any).user };
  },
}))

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// your routes here
app.get("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Page not found'
  });
});

app.use(errorMiddleware);

// startStandaloneServer(server, { listen: { port: port } }).then(({ url }) => {
//   console.log(`🚀 Server ready at ${url}`);
// }).catch((error) => {
//   console.error('Error starting server:', error);
// });


app.listen(port, () => console.log('Server is working on Port:' + port + ' in ' + envMode + ' Mode.'));