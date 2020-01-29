const PouchDB = require('pouchdb')
const { COUCHDB_URL } = process.env
const nasaUsersDB = new PouchDB(`${COUCHDB_URL}/nasa_users`, {
    skip_setup: true
})

module.exports.login = function (req, res) {
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
                errorType: 'database error',
                admin_secret_url: COUCHDB_URL,
                error: err
            }
        })
    })
}

module.exports.register = function (req, res) {
    res.status(200).json({
        register: 'from controller'
    })
}