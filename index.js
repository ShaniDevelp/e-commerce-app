const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productRouter = require('./routes/product');
const categoryRouter = require('./routes/categoryRoutes');
const cartRouter = require('./routes/cartRoutes');
const orderRouter = require('./routes/orderRoutes');
const addressRouter = require('./routes/addressRoutes');

const app = express();


// DB Connection
mongoose.set('strictQuery', false);
const db = 'mongodb+srv://Admin:wWeNpL9qCSaya4DZ@cluster0.ilwkopa.mongodb.net/Farhan_Ecommerce_app?retryWrites=true&w=majority&appName=Cluster0'
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(db)
  console.log('database is connected')
}

// wWeNpL9qCSaya4DZ

// view engine setup


app.use(cors({
  exposedHeaders: ['X-Total-Count'],
  origin: ["https://e-commerce-app-zeta-green.vercel.app"],
  methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
  credentials: true
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// app.use('/', indexRouter);
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
