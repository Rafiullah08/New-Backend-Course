import 'dotenv/config'
import dbConnetion from './db/index.js'
import app from './app.js'




dbConnetion()
.then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log(`serveri is running on port ${process.env.PORT}`);
        
    })
})
.catch((err)=>{
    console.log(`MONGO db connection error ${err}`);
    
})










// (async ()=>{
// try {
//    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//     app.on('error',(error)=>{
//         console.log("error",error );
//         throw  error
//     })

//     app.listen(process.env.PORT,()=>{
//         console.log(`server is running on port ${process.env.PORT}`);
        
//     })

// } catch (error) {
//     console.log(error);
//     throw error
    
// }

// })()