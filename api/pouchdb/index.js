const PouchDB = require('pouchdb')

PouchDB.plugin(
    require('pouchdb-find')
)

const { COUCHDB_URL } = process.env

module.exports.PouchDB = PouchDB

module.exports.nasaUsersDB = new PouchDB(`${COUCHDB_URL}/nasa_users`, {
    skip_setup: false
})