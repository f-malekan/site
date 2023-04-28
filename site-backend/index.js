const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const auth = require('./routes/auth')
const postRoutes = require('./routes/postRoutes')
require('dotenv').config()

app.use(cors());
app.use(express.json());
app.use('/api/users',userRoutes);
app.use('/api/categories',categoryRoutes);
app.use('/api/auth',auth);
app.use('/api/posts',postRoutes);


mongoose.connect('mongodb://localhost:27023/site',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(()=>console.log('connected to mongodb...'))
    .catch(err=>console.error('could not connect to mongodb...',err))


app.listen(3000,()=>console.log('listening to port 3000'))