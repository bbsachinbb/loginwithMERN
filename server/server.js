const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors')
const fs = require('fs');
require('dotenv').config();



const app = express();

mongoose.connect(process.env.DATABASE, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,

})
.then(()=> console.log('mongo connected'))
.catch(err => console.log(`db connection error`));

//middleware

app.use(morgan("dev"));
app.use(bodyParser.json({limit: "2mb"}));
app.use(cors());


// route
// to take route automatically

fs.readdirSync('./routes').map((r) => {
    app.use( '/api', require('./routes/' + r));
});


const port = process.env.PORT || 8000;


app.listen(port, () => {
    console.log(`running on port ${port}`);
})


