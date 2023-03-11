const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// adding extra routes below






const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: 'password',

  cookie: {
    maxAge: 24 * 60 * 60 * 1000, 
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};
app.use((req, res, next) => {
  if (req.session && req.session.userId) {
    res.locals.sessionUserId = req.session.userId;
  }
  next();
});

app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

// Set up sequalize sync here 