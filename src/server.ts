import { Server } from "http";
import app from "./app";
import config from "./config";
import dbConnect from "./utils/dbConnect";

let server: Server;

const port = config.port || 8080;

async function main() {
    try {
      await dbConnect();
      server = app.listen(port,  () => {
        console.log(`Shortener Backend Server listening on port ${port}`);
      });

    } catch (error) {
      console.log(error);
    }
  }
  
  main();



  //asynchronous code error
  process.on('unhandledRejection', (err)=>{
    console.log(`❤❤ unahandledRejection is detected , shutting down ...`, err);
    if(server){
      server.close(()=>{
        process.exit(1);
      })
    }
    process.exit(1)
  })



  //synchronous code error--process immediately off
  process.on('uncaughtException', () => {
    console.log(`😛😛 uncaughtException is detected , shutting down ...`);
    process.exit(1);
  });


 