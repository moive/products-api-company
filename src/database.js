import mongoose from 'mongoose';

// prettier-ignore
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.0kfw6.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`;

// prettier-ignore
mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((db) => console.log('Db is connect'))
    .catch((error) => console.log(error));
