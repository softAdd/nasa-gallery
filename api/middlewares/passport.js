const JwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')
const { jwtKey } = require('../config')
const { nasaUsersDB } = require('../pouchdb')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtKey
}

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, async (payload, done) => {
            try {
                const { docs } = await nasaUsersDB.find({
                    selector: {
                        _id: payload.userId
                    },
                    fields: ['_id', 'email'],
                    limit: 1
                })
                const user = docs[0]

                if (user) {
                    done(null, user)
                } else {
                    done(null, false)
                }
            } catch (err) {
                console.error(err)
            }
        })
    )
}