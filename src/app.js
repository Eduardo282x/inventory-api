import express from "express";
import morgan from "morgan";
import cors from "cors";
import authenticationRouter from './routes/authentication.routes';
import usersRouter from './routes/users.route';
import clientRouter from './routes/client.route';
import inventoryRouter from './routes/inventory.routes';
import cartRouter from './routes/cart.routes';
import salesRouter from './routes/sales.route';

const app = express();

// Settings
app.set("port",3008);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/authentication',authenticationRouter);
app.use('/api/users',usersRouter);
app.use('/api/client',clientRouter);
app.use('/api/inventory',inventoryRouter);
app.use('/api/cart',cartRouter);
app.use('/api/sales',salesRouter);

export default app;
