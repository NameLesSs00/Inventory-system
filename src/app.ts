import express from 'express';
import supplieRoutes from "./routes/supplie_route"
import { Supplie } from './models/supplie';
import { Log } from './models/log';
const app = express();

let op = new Supplie("pen1",["school"],100,15);
let id = op.toOurSuppllies().id
Log.addLog(id,100,false);
op =new Supplie("book1",["school"],10,0);
id = op.toOurSuppllies().id
Log.addLog(id,10,false);
op =new Supplie("pen2",["school"],200,455);
id = op.toOurSuppllies().id
Log.addLog(id,200,false);

app.use(express.json());

app.get("/api",(req,res)=>{
  res.json({
    working:true,
    msg:"keep going."
  })
})

app.use('/api',supplieRoutes);


export default app;


//some data to add
/*

{
  "name": "Pencil",
  "tags": ["stationery", "writing"],
  "quantity": 300,
  "refill_number_alert": 30
}

{
  "name": "Highlighter",
  "tags": ["stationery", "office"],
  "quantity": 120,
  "refill_number_alert": 10
}

{
  "name": "Glue Stick",
  "tags": ["craft", "office"],
  "quantity": 60,
  "refill_number_alert": 5
}
  
{
  "name": "Whiteboard Marker",
  "tags": ["office", "whiteboard"],
  "quantity": 90,
  "refill_number_alert": 15
}


*/

/*now we kinda made the */

