import { app } from "./app.js";
import { config } from "dotenv";
import { connectDB } from "./data/database.js";


config({
    path:"./data/config.env"
})


connectDB();

app.get('/',(req,res)=>{
    res.json({success:true,message:"home page loaded"});
})

const port_number=process.env.port_number;
app.listen(port_number,()=>{
    console.log('server listening on port ',port_number);
})