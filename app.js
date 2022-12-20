const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const connect = require('./database/connection');
const authRoutes = require('./routes/authRoute');
const userRoutes = require('./routes/userRoute');
const difficultyRoutes = require('./routes/difficultyRoute');
const quetionsRoutes = require('./routes/quetionsRoute');
const cors = require('cors');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;

app.use(express.json())
app.use(bodyParser.json())
connect();
app.use(cors());

app.use('/api',authRoutes);
app.use('/api',userRoutes);
app.use('/api',difficultyRoutes);
app.use('/api',quetionsRoutes);

app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());

app.use(express.static('frontend/build'))

app.listen(PORT,()=>{
    console.log(`app is running on port ${PORT}`);
})