import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server.js";
import Index from "./index"

const app = express();
const port = 3000;

app.get('/',(req,res)=>{
    let html = ReactDOMServer.renderToString(React.createElement(Index));
    res.send(html);
})

app.listen(port,()=>{
    console.log(`server on port ${port}`);
})