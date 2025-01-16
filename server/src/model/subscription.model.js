import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
    subscriber :{
        type: Schema.Type.ObjectId, // one who is subscribing  
        ref: 'User'
    },
    channel :{
        type: Schema.Type.ObjectId,
        ref: 'user'
    }
}, {Timestamps: true});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;