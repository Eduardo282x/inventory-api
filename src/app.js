import express from "express";
import morgan from "morgan";
import cors from "cors";
import authenticationRouter from './routes/authentication.routes';
import usersRouter from './routes/users.route'
import inventoryRouter from './routes/inventory.routes'

const app = express();

// Settings
app.set("port",3002);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/authentication',authenticationRouter);
app.use('/api/users',usersRouter);
app.use('/api/inventory',inventoryRouter);

export default app;
