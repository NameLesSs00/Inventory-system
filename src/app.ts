import express from 'express';
import supplieRoutes from "./routes/supplie_route"
const app = express();

app.use(express.json());

app.get("/",(req,res)=>{
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