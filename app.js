import express from "express";
import path from "path";
import morgan from "morgan";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import routes from "./routes/index";
import userRoutes from "./routes/users";

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGOLAB_URI || 'mongodb://localhost/Poke';
mongoose.connect(MONGO_URL);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/user', userRoutes);
app.use('home', routes);
app.use('profile', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(PORT, () => {
  console.log(`I'm listening on this port: ${PORT}`);
})

export default app;
