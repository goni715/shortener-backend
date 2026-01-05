import express, { Application, Request, Response } from "express";
import cors from 'cors';
import morgan from "morgan";
import bodyParser from "body-parser";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import notFound from "./middlewares/notFound";


const app: Application = express();


app.use(cors());
app.use(morgan('dev'));

app.get('/', (req:Request, res:Response) => {
    res.send(`Shotener backend server is running......`);
});


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


// Global Error-handling
app.use(globalErrorHandler);

//route not found
app.use(notFound)


export default app;