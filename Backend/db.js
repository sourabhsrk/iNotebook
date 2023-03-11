const mongoose = require('mongoose');

const mongoURI = "mongodb://127.0.0.1:27017/iNotebook";

// const connectToMongo = () => {
//     mongoose.connect(mongoURI,(err)=>{
//         if(err){
//             console.log("failed to connect to mongodb" , err);
//         }
//         else{
//             console.log(err,"Connect to mongoose");
//         }
//     })
// }

const connectToMongo = async () => {
    try{
        await mongoose.connect(mongoURI);
        console.log("connected to mongosdb");
    }
    catch(err){
        console.log("failed to connect to mongodb",err);
    }
}

module.exports = connectToMongo;