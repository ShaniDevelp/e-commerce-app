const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const mongoose = require('mongoose');
const stripe = require("stripe")(process.env.STRIPE_KEY);

const usersRouter = require('./src/routes/users');
const productRouter = require('./src/routes/product');
const categoryRouter = require('./src/routes/categoryRoutes');
const cartRouter = require('./src/routes/cartRoutes');
const orderRouter = require('./src/routes/orderRoutes');
const addressRouter = require('./src/routes/addressRoutes');

const app = express();

mongoose.set('strictQuery', false);
const db = process.env.DB_CONNECTION_STRING
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(db)
  console.log('database is connected')
}


app.use(cors({
  exposedHeaders: ['X-Total-Count'],
  origin: ["https://e-commerce-cdi9.vercel.app"],
  methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
  credentials: true
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




app.post("/create-payment-intent", async (req, res) => {
  const { totalAmount } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalAmount*100,
    currency: "Pkr",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});


app.use('/users', usersRouter);
app.use('/products', productRouter);
app.use('/categories', categoryRouter);
app.use('/cart', cartRouter);
app.use('/orders', orderRouter);
app.use('/addresses', addressRouter);
app.use('*', (req, res) =>
  res.sendFile(path.resolve('build',  'index.html'))
);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


app.get('/', (req, res) => {
  res.send({ status: 'running' })
})

app.listen(4000, () => {
  console.log('server listening')
});
