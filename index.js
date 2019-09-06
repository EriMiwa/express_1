const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.get('/api', (req, res) =>
  res.send('<h1>hello world</h1>')
)

// app.get('/', (req, res) => 
//   res.sendFile(path.join(__dirname, 'public', 'index.html'))
// );


//Set Static Folder
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//Connnect to mongoDB
const uri = process.env.ATLAS_URI
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB connection worked successfully!');
  console.log('new date', new Date())
})

// Members API Routes
app.use('/api/members', require('./routes/api/members'));
app.use('/api/exercises', require('./routes/api/exercises'));

//Set state folder
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join('frontend/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html')); // relative path
  });

}


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`))