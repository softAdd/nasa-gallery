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

module.exports.login = function (req, res) {
    checkLoginRequest(req, res)

    res.sendStatus(200)
}

module.exports.register = function (req, res) {
    checkLoginRequest(req, res)

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
            error
        })
    })
}