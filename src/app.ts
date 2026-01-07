import express, { Application, Request, Response } from "express";
import cors from 'cors';
import morgan from "morgan";
import bodyParser from "body-parser";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import notFound from "./middlewares/notFound";
import AuthRoutes from "./routes/auth.routes";
import UrlRoutes from "./routes/url.routes";


const app: Application = express();


app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:3000",
      "http://localhost:3001",
      "https://shortener-goni.vercel.app"
    ],
    credentials: true,
  }),
);
app.use(morgan('dev'));

app.get('/', (req:Request, res:Response) => {
    res.send(`Shortener backend server is running......`);
});


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


//application routes
app.use('/api/v1/auth', AuthRoutes);
app.use('/api/v1/url', UrlRoutes);

// Global Error-handling
app.use(globalErrorHandler);

//route not found
app.use(notFound)


export default app;