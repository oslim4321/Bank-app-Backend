require('dotenv').config();
require('express-async-errors');
const cors = require('cors')
const connectDB = require('./src/db/connect')
const cookieParser = require('cookie-parser');
/* import Extra security middleware */
const helmet = require('helmet')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')


const express = require('express');
const app = express();
const corsOptions = {
  origin: true, //included origin as true
  credentials: true, //included credentials as true
};
app.use(cors(corsOptions))


// const route = require('./src/routes/main')
const user = require('./src/routes/User')
const transaction = require('./src/routes/Transaction')
const auth = require('./src/routes/Auth')
const SendMoney = require('./src/routes/SendMoney')

// middleware
app.use(express.static('../Client'));
app.use(express.json());
app.use(cookieParser())

// app.use('/api/v1/banking', route)
app.use('/api/v1/banking/user/', user)
app.use('/api/v1/banking/transaction/', transaction)
app.use('/api/v1/banking/auth/', auth)
app.use('/api/v1/banking/sendedMoneyTransaction/', SendMoney)

/*Use Extra security middleware */
app.set('trust proxy', 1)
app.use(rateLimit({
  window: 15 * 6 * 1000,
  max: 100
}))
app.use(helmet())
app.use(xss())



// app.get('/CheckReq', async(req, res) => {
//     console.log('wpowow')
//     res.send(req.user)
//     // console.log('hii', req.user)
   
// })

app.get('/', async(req, res)=> {
  res.send('This is backend ruuning on node.js')
})

const port = process.env.PORT || 1234;

const start = async () => {
  try {
    await connectDB(process.env.MANGO_URL)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
