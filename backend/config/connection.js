const mongoose = require('mongoose');

const connectdb = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL,{
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log(`Monogodb connection ${conn.connection.host}`)

    } catch (error) {
        console.log(error.message);
        process.exit();
    }
}

module.exports = connectdb;