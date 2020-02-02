const moment = require('moment')
const bcrypt = require('bcrypt')
const PouchDB = require('../pouchdb')
const { COUCHDB_URL } = process.env
const nasaUsersDB = new PouchDB(`${COUCHDB_URL}/nasa_users`, {
    skip_setup: false
})

const checkLoginRequest = (req, res) => {
    if (!req.body) return res.sendStatus(400)
    if (!req.body.email) return res.status(400).json({ error: errorTypes.requiredEmail })
    if (!req.body.password) return res.status(400).json({ error: errorTypes.requiredPassword })
}

module.exports.login = async function (req, res) {
    checkLoginRequest(req, res)

    res.sendStatus(200)
}

module.exports.register = async function (req, res) {
    checkLoginRequest(req, res)

    try {
        const { docs } = await nasaUsersDB.find({
            selector: {
                email: req.body.email
            },
            limit: 1
        })
        if (docs > 0) {
            res.status(409).json({
                message: 'email is busy'
            })
        } else {
            bcrypt.genSalt(10, (err, salt) => {
                if (err) throw new Error('Error while generating salt')

                bcrypt.hash(req.body.password, salt, async function(err, hash) {
                    if (err) throw new Error('Error while generating hash')

                    const user = {
                        _id: `${req.body.email}-${moment().format("DD.MM.YYYY-hh:mm:ss")}`,
                        email: req.body.email,
                        password: hash,
                        savedImages: []
                    }

                    await nasaUsersDB.put(user, err => {
                        if (err) throw new Error('Error while putting into database')

                        res.sendStatus(201)
                    })
                })
            })
        }
    } catch (err) {
        res.status(500).json({
            error: err
        })
    }
}