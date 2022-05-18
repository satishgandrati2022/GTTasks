var express=require("express")
var app=  express()
var fs=require("fs")
const fileUpload = require('express-fileupload');
const { BlobServiceClient } = require("@azure/storage-blob");
const connStr = "DefaultEndpointsProtocol=https;AccountName=blobstorage2217;AccountKey=8rPjruCApMUFfCNMH1iTEWsd9CkNKhs7AASutJxt+7BFHo9A3HFrZkVqFFbPT6T5zM3dElEzhSiu+AStzLRPRw==;EndpointSuffix=core.windows.net";

const blobServiceClient = BlobServiceClient.fromConnectionString(connStr);
app.use(fileUpload())
app.use(express.json())

app.get("/",function(request,response){
    response.send("Hello World!!!! node app is running... with changes")
})

app.post("/upload",async function(request,response){
    let file=request.files.myfile
   
   const content = Buffer.from(file.data,"binary")
    const containerClient = blobServiceClient.getContainerClient("mystore");
    
    //const content = "Hello world!";
    const blobName = file.name;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const uploadBlobResponse = await blockBlobClient.upload(content, content.length);
    response.send(`Upload block blob ${blobName} successfully`);



})


app.listen("3000",function(){
    console.log("server is running on 3000")
})