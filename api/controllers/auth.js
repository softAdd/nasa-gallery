const PouchDB = require('../pouchdb')
const { COUCHDB_URL } = process.env
const nasaUsersDB = new PouchDB(`${COUCHDB_URL}/nasa_users`, {
    skip_setup: true
})

const errorTypes = {
    databaseError: 'database error',
    userExists: 'this user already exists',
    requiredEmail: 'email is required',
    requiredPassword: 'password is required'
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

module.exports.register = async function (req, res) {
    if (!req.body) return res.sendStatus(400)
    if (!req.body.email) return res.status(400).json({ error: errorTypes.requiredEmail })
    if (!req.body.password) return res.status(400).json({ error: errorTypes.requiredPassword })

    try {
        const { docs } = await nasaUsersDB.find({
            selector: {
                email: req.body.email
            },
            limit: 1
        })
        if (docs.length > 0) {
            res.status(409).json({
                error: errorTypes.userExists
            })
        } else {
            nasaUsersDB.post({
                email: req.body.email,
                password: req.body.password
            }, function (err, response) {
                if (err) {
                    res.status(500).json({
                        error: errorTypes.databaseError
                    })
                    return console.error(err)
                }
                res.status(200).json({
                    status: response
                })
            })
        }
    } catch (e) {
        console.error(e)
        res.status(500).json({
            error: errorTypes.databaseError
        })
    }
}