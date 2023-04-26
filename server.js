const app = require('./app.js');
const dotenv = require('dotenv');
const db = require('./config/db.js');

process.on('uncaughtException' , (err)=>{
    console.log(`${err.message}`);
    console.log("shutting down server Uncaught Exception ");
    process.exit(1);
})

dotenv.config({path:'./config/config.env'});

db();

const server = app.listen(process.env.PORT , ()=>{
    console.log(`app is listening on http://localhost:${process.env.PORT}`)
})

process.on('unhandledRejection' , ()=>{
    console.log('closing due to unhandled rejection');
    server.close(()=>{
        process.exit(1);
    })
})