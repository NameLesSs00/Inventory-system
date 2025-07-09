import express from 'express';

const app = express();

app.use(express.json());

app.get("/",(req,res)=>{
  res.json({
    working:true,
    msg:"keep going."
  })
})

app.use('/api',(req,res)=>{
  
});



export default app;
