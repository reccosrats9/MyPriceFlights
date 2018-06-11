require('dotenv').config()
const express = require('express'),
        bodyParser = require('body-parser'),
        massive = require('massive'),
        session = require('express-session'),
        // path= require('path'),
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
        SUCCESS_REDIRECT,
        AUTH0_REDIRECT,
        API_ID,
        API_KEY,
        X_KEY,
        X_HOST,
        TWILIO_ACCOUNTSID,
        TWILIO_AUTHTOKEN
} = process.env

const client = require('twilio')(TWILIO_ACCOUNTSID, TWILIO_AUTHTOKEN)

massive(CONNECTION_STRING).then(db => app.set('db', db)).catch(err => (console.log('massive', err)))

app.use( express.static( `${__dirname}/../build` ) );

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
        successRedirect: SUCCESS_REDIRECT
}))
app.get('/auth/me', (req, res) => {
        console.log('user', req.user)
        if (req.user) { res.status(200).send(req.user) }
        else { res.status(401).send('Please sign in to view this page') }
})
app.get('/logout', (req, res) => {
        req.logOut()
        res.redirect(`https://reccosrats9.auth0.com/v2/logout?returnTo
        ${AUTH0_REDIRECT}`);
})

//API calls
cron.schedule('0 * * * *', () => {
        app.get('db').get_users_and_routes().then(routes => {
                routes.map(route => {
                        let { origin, destination, price, routeid, phone, textsent, textdate} = route
                        if (textsent){
                                let textSentDate= new Date(textdate)
                                let current= new Date()
                                if((current-textSentDate)/1000/60/60/24 >7){
                                        console.log('get rid of date')
                                        app.get('db').reset_text([routeid]).then(response=>console.log('date reset',response))
                                }
                                else{console.log('too recent', current)}
                        }
                        unirest.get(`https://skyscanner-skyscanner-flight-search-v1.p.mashape.com/apiservices/browsedates/v1.0/US/USD/en-US/${origin}-sky/${destination}-sky/anytime/anytime`)
                                .header("X-Mashape-Key", `${X_KEY}`)
                                .header("X-Mashape-Host", `${X_HOST}`)
                                .end(results => { 
                                                let carriers= results.body.Carriers
                                                let quotes = results.body.Quotes.filter(quote => quote.MinPrice <= price)
                                                quotes.map(quote => {
                                                        console.log(quote)
                                                        let quoteDepart=quote.OutboundLeg.DepartureDate
                                                        let quoteDCarriers= quote.OutboundLeg.CarrierIds
                                                        let quoteReturn= quote.InboundLeg.DepartureDate
                                                        let quoteRCarriers= quote.InboundLeg.CarrierIds
                                                        let quotePrice= quote.MinPrice

                                                        function quoteData(directionCarrier){
                                                                let carrierNames=[]
                                                                for(let i=0;i<directionCarrier.length; i++){
                                                                        for (let j=0; j<carriers.length; j++){
                                                                                if(directionCarrier[i]===carriers[j].CarrierId){
                                                                                        carrierNames.push(
                                                                                                carriers[j].Name
                                                                                        )
                                                                                }
                                                                        }
                                                                }
                                                                return carrierNames
                                                        }
                                                        
                                                        quote.DCarrier = quoteData(quoteDCarriers)
                                                        quote.RCarrier= quoteData(quoteRCarriers)
                                                        // console.log(quote)
                                                        
                                                })

                                                if (quotes.length>0){
                                                        let approvedQuotes= quotes.filter(quote=>quote.OutboundLeg.CarrierIds[0])
                                                        app.get('db').add_match([routeid, JSON.stringify(approvedQuotes)]).catch(err => (console.log('add match', err)))
                                                }
                                                
                                                if (quotes.length > 0 && !textsent){
                                                        console.log('should send magic man')
                                                        client.messages
                                                                .create({
                                                                        to: `+1${phone}`,
                                                                        from: '+14805669429',
                                                                        body: `Your friends at My Price Flights have found a match! Flying from ${origin} to ${destination} is less than ${price}. Log in to view flight details.`,
                                                                mediaUrl: 'https://media.giphy.com/media/ujUdrdpX7Ok5W/giphy.gif',
                                                                // mediaUrl: './magic'
                                                                })
                                                                .then(message => {
                                                                        console.log(message.sid)
                                                                        let now= new Date()
                                                                        console.log(now)
                                                                        app.get('db').text_sent([routeid, now]).then(()=>{})
                                                                }).catch(err=>console.log('text sent', err))
                                                }
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
app.get('/quotes/:routeid', controller.routeMatch)


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

//MUST BE LAST ENDPOINT!!!
// app.get('*', (req, res)=>{
//         res.sendFile(path.join(__dirname, '../build/index.html'));
//     });

app.listen(SERVER_PORT, console.log(`Flying high on port ${SERVER_PORT} 🛩  🏖`))