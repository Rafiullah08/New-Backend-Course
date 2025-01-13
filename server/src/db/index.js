import mongoose from 'mongoose'



const dbConnetion = async ()=>{

    try {
     const connectionInstanse =  await mongoose.connect(`${process.env.MONGODB_URI}`)
    console.log(`mongDb connected successfully !!`);

    } catch (error) {
        console.log('mongoDb connection error', error);
        process.exit(1)  
    }
}

export default dbConnetion