require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const statusRoute = require('./routes/statusRoute');
const transitionRoute = require('./routes/transitionRoute');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${encodeURIComponent(process.env.DB_USERNAME)}:${encodeURIComponent(process.env.DB_PASSWORD)}@${process.env.DB_CLUSTER}?retryWrites=true&w=majority`;
console.log("Connecting to MongoDB URI:", uri);

mongoose.connect(uri)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

app.use('/api/status', statusRoute);
app.use('/api/transition', transitionRoute);

app.get('/', (req, res) => {
  res.send('Server is running');
});



