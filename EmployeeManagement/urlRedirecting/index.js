const express = require("express");
const mongoose = require("mongoose")
const shortUrl = require("shortid");
mongoose.connect("mongodb://localhost:27017/sort-id")
.then(()=>console.log("mongodb connceted")).catch((err)=> console.log(err.name, err.message));

const urlSchema = new mongoose.Schema({
    sortId :{
        type : String,
        required : true,
        unique : true
    },

    redirectUrl : {
        type : String,
        required : true
    },

    visitHistory : [{timestam : {type : Number}}]
},{timestam : true})

const urlModel = new mongoose.model("url", urlSchema)


const app = express();

app.use(express.json())

app.get("/url", async(req, resp)=>{
    const shortId = shortUrl()
    const newUrl = await urlModel.create({
        sortId : shortId,
        redirectUrl : req.body.url,
    });

    resp.status(201).json({
        status : "Success",
        newUrl,
    })
});

app.get("/chatGPT", async(req, resp)=>{
    const urlData = await urlModel.findOne({sortId : req.params.shortId});
    console.log(urlData);
     if(urlData){
        await urlModel.findOneAndUpdate({sortId : req.params.shortId},
           {$push : {visitHistory : {timestam :45}}} 
            )
     }
    resp.redirect("https://chat.openai.com/");
})

app.listen(4000, ()=>console.log("start 4000"));

