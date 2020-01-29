const PouchDB = require('pouchdb')

module.exports = PouchDB.plugin(
    require('pouchdb-find')
)