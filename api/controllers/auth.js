const PouchDB = require('../pouchdb')
const User = require('../pouchdb/models/User')
const { COUCHDB_URL } = process.env
const nasaUsersDB = new PouchDB(`${COUCHDB_URL}/nasa_users`, {
    skip_setup: true
})

const errorTypes = {
    databaseError: 'database error'
}

module.exports.login = function (req, res) {
    if (!req.body) return res.sendStatus(400)

    nasaUsersDB.allDocs({
        include_docs: true,
        attachments: true
    }).then(result => {
        res.status(200).json({
            login: {
                email: req.body.email,
                password: req.body.password,
            },
            database: result
        })
    }).catch(err => {
        res.status(200).json({
            login: {
                errorType: errorTypes.databaseError,
                admin_secret_url: COUCHDB_URL,
                error: err
            }
        })
    })
}

module.exports.register = function (req, res) {
    if (!req.body) return res.sendStatus(400)

    const user = new User({
        email: req.body.email || '',
        password: req.body.password || ''
    })
    nasaUsersDB.find({
        selector: {
            email: req.body.email
        },
        fields: ["email"],
        limit: 1
    }).then(result => {
        res.status(200).json({
            result,
            exampleDocs: result.docs
        })
    }).catch(error => {
        res.status(200).json({
            errorType: errorTypes.databaseError,
            error
        })
    })
}