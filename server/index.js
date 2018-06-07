require('dotenv').config()
const express = require('express'),
        bodyParser = require('body-parser'),
        massive = require('massive'),
        session = require('express-session')
controller = require('./controller'),
        passport = require('passport'),
        Auth0Strategy = require('passport-auth0'),
        axios = require('axios'),
        unirest = require('unirest'),
        stripe = require('stripe')(process.env.STRIPE_SECRET),
        cron = require('node-cron')

const app = express()
app.use(bodyParser.json())

const {
        SERVER_PORT,
        SESSION_SECRET,
        CONNECTION_STRING,
        DOMAIN,
        CLIENT_ID,
        CLIENT_SECRET,
        CALLBACK_URL,
        API_ID,
        API_KEY,
        X_KEY,
        X_HOST,
        TWILIO_ACCOUNTSID,
        TWILIO_AUTHTOKEN
} = process.env

const client = require('twilio')(TWILIO_ACCOUNTSID, TWILIO_AUTHTOKEN)

massive(CONNECTION_STRING).then(db => app.set('db', db)).catch(err => (console.log('massive', err)))

app.use(session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(new Auth0Strategy({
        domain: DOMAIN,
        clientID: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        callbackURL: CALLBACK_URL,
        scope: 'openid profile'
}, (accessToken, refreshToken, extraParams, profile, done) => {
        let db = app.get('db')
        let { displayName, id, picture } = profile
        db.find_user([id]).then(foundUser => {
                if (foundUser[0]) {
                        done(null, foundUser[0].id)
                } else {
                        db.create_user([displayName, picture, id]).then(user => {
                                done(null, user[0].id)
                        }).catch(err => (console.log('createUser', err)))
                }
        }).catch(err => (console.log('findUser', err)))

}))

passport.serializeUser((id, done) => {
        done(null, id)
})
passport.deserializeUser((id, done) => {
        let db = app.get('db')
        db.find_session_user([id]).then(user => {
                done(null, user[0])
        }).catch(err => (console.log('deserialize', err)))
})

//Sessions and Auth0 endpoints
app.get('/login', passport.authenticate('auth0'))
app.get('/auth/callback', passport.authenticate('auth0', {
        successRedirect: 'http://localhost:3000/#/home'
}))
app.get('/auth/me', (req, res) => {
        console.log('user', req.user)
        if (req.user) { res.status(200).send(req.user) }
        else { res.status(401).send('Please sign in to view this page') }
})
app.get('/logout', (req, res) => {
        req.logOut()
        res.redirect(`https://reccosrats9.auth0.com/v2/logout?returnTo=${encodeURIComponent('http://localhost:3000/#/')}&client_id=${CLIENT_ID}`);
})

//API calls
cron.schedule('37 47 * * * *', () => {
        // console.log('first try')
        // return console.log('hit it')
        app.get('db').get_users_and_routes().then(routes => {
                routes.map(route => {
                        let { origin, destination, price, routeid, phone, textsent, textdate} = route
                        if (textsent){
                                let textSentDate= new Date(textdate)
                                let current= new Date()
                                if((current-textSentDate)/1000/60/60/24 >7){
                                        console.log('get rid of date')
                                }
                                else{console.log('too recent')}
                        }
                        unirest.get("https://skyscanner-skyscanner-flight-search-v1.p.mashape.com/apiservices/browsedates/v1.0/US/USD/en-US/SLC-sky/CDG-sky/anytime/anytime")
                                .header("X-Mashape-Key", `${X_KEY}`)
                                .header("X-Mashape-Host", `${X_HOST}`)
                                .end(results => {
                                                let quotes = results.body.Quotes.filter(quote => quote.MinPrice <= price)
                                                quotes.map(quote => {
                                                        app.get('db').add_match([routeid]).then(route => {
                                                                // console.log(route)
                                                        }).catch(err => (console.log('deserialize', err)))
                                                })
                                                
                                                if (quotes.length > 0 && !textsent){
                                                        console.log('should send magic man')
                                                        client.messages
                                                                .create({
                                                                        to: `+1${phone}`,
                                                                        from: '+14805669429',
                                                                        body: `Your friends at My Price Flights have found a match! Flying from ${origin} to ${destination} is less than ${price}. Use your favorite flight service to book while prices last!`,
                                                                mediaUrl: 'http://gph.is/Quih86',
                                                                // mediaUrl: './magic'
                                                                })
                                                                .then(message => {
                                                                        console.log(message.sid)
                                                                        let now= new Date()
                                                                        console.log(now)
                                                                        app.get('db').text_sent([routeid, now]).then(()=>{})
                                                                }).catch(err=>console.log('text sent', err))
                                                }

                                        //text all users with a true NewMatch, but not multiple times
                                        // let userQuotes= quote
                                }

                                )

                })
        })
})



// axios.get(`http://developer.goibibo.com/api/search/?app_id=${API_ID}app_key=${API_KEY}&format=json&source=SLC&destination=CDG&dateofdeparture=20180628&seatingclass=E&adults=1&children=0&infants=0&counter=0`).then(res=>{
// let {onwardflights}= res.data.data
// console.log(onwardflights[0])
// res.data.onwardflights.map()
// })
// app.get('db').get_all_routes().then(routes=>{

// })


//DB endpoints
app.put('/contact/:id', controller.addPhoneEmail)
app.post('/route', controller.addNewRoute)
app.get('/routes/:id', controller.getUserRoutes)
app.put('/route/:routeid', controller.changeRoute)
app.delete('/route/:routeid', controller.deleteRoute)
app.put('/routeseen/:routeid', controller.routeSeen)
app.put('/pro/:id', controller.makePro)


//stripe
app.post('/api/payment', function (req, res, next) {
        // convert amount to pennies
        const amountArray = req.body.amount.toString().split('');
        const pennies = [];
        for (var i = 0; i < amountArray.length; i++) {
                if (amountArray[i] === ".") {
                        if (typeof amountArray[i + 1] === "string") {
                                pennies.push(amountArray[i + 1]);
                        } else {
                                pennies.push("0");
                        }
                        if (typeof amountArray[i + 2] === "string") {
                                pennies.push(amountArray[i + 2]);
                        } else {
                                pennies.push("0");
                        }
                        break;
                } else {
                        pennies.push(amountArray[i])
                }
        }
        const convertedAmt = parseInt(pennies.join(''));

        const charge = stripe.charges.create({
                amount: convertedAmt, // amount in cents, again
                currency: 'usd',
                source: req.body.token.id,
                description: 'Test charge from react app'
        }, function (err, charge) {
                if (err) return res.sendStatus(500)
                return res.sendStatus(200);
                // if (err && err.type === 'StripeCardError') {
                //   // The card has been declined
                // }
        });
});



app.listen(SERVER_PORT, console.log(`Flying high on port ${SERVER_PORT} 🛩  🏖`))