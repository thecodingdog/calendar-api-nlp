require('dotenv').config()

const express = require('express')
const cors = require('cors')
const app = express()
const passport = require('passport')
// const session = require('express-session')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const Handlebars = require('handlebars')
// const flash = require('connect-flash')

const corsOptions = {
  origin: 'https://safe-headland-74827.herokuapp.com',
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// const methodOverride = require('method-override')
app.use(cors(corsOptions))

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

// app.use(session({
//   secret: 'super secret',
//   resave: false,
//   saveUninitialized: true
// }))
// app.use(passport.initialize())
// app.use(passport.session())
const taskRoutes = require('./server/routes/tasks');
const authRoutes = require('./server/routes/auth');

Handlebars.registerHelper('moment', require('helper-moment'))
// app.use(require('cookie-parser')())
app.use(express.static('public'))
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

// app.use(flash())
const models = require('./server/models')
// require('./server/routes/routes')(app, passport)
require('./server/config/passport')(passport, models.user)

models.sequelize.sync().then(function () {
  console.log('Database connected')
}).catch(function (err) {
  console.log(err, 'ERR database')
})

app.use('/userAuth', authRoutes);
app.use('/task', passport.authenticate('jwt', {session: false}), taskRoutes);

const server = app.listen(process.env.PORT || 3000)
console.log(`Server UP at ${process.env.PORT || 3000}`)

module.exports = {
  app,
  server
}
