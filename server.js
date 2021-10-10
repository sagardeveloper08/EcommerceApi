const express = require('express');
const app = express();
const dotenv = require('dotenv');
const router = require('./routes/routes');
const cors = require('cors')
const authJwt = require('./middleware/auth')
const errorHandler = require('./middleware/errorHandler')

app.use(cors());
app.options('*',cors())
require('./models/db/config')
dotenv.config();


// middleware
app.use(authJwt())
app.use(express.json())
app.use(errorHandler)

app.use('/api/user',router)

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`server is running on  ${PORT}`);
})