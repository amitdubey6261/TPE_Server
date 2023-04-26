const mongoose = require('mongoose');


const db = () => {
    mongoose.connect(process.env.DB_URI , {
        useUnifiedTopology:true
    })
    .then((res)=>{
        console.log(`mongodb connected to server ${process.env.DB_URI}`);
    })
    .catch((e)=>{
        console.log( e );
    })
}

module.exports = db ;