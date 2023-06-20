import mongoose from 'mongoose';
const schema = mongoose.Schema({
    time: String,
    topic: String,
    tuit: String,
    likes: Number,
    liked: Boolean,
    dislikes: Number,
    replies: Number,
    retuits: Number,
    username: String,
    image: String,
    handle: String,
}, {collection: 'tuits'});
export default schema;