const express = require('express');
const app= express();
const port = 4000;
const bodyParser= require('body-parser');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
require('./utils/DB')  // Connect database with server

//Middlewares
app.use(bodyParser.json());

app.use('/api', userRoutes); 

app.use(cors());

//API
app.get('/', (req, res) => {
    res.send('Hello World');
});


app.listen(port, ()=>{
    console.log('Server is listening on port', port);
});
