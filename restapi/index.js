const app = require('./app')

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () => console.log(`Server has been started on ${PORT}`))

// shut down server
function shutdown() {
    server.close(function onServerClosed(err) {
        if (err) {
            console.error(err)
            process.exitCode = 1
        }
        process.exit()
    })
}

// quit on ctrl-c when running docker in terminal
process.on('SIGINT', function onSigint() {
    console.info('Got SIGINT (aka ctrl-c in docker). Graceful shutdown ', new Date().toISOString())
    shutdown()
})

// quit properly on docker stop
process.on('SIGTERM', function onSigterm() {
    console.info('Got SIGTERM (docker container stop). Graceful shutdown ', new Date().toISOString())
    shutdown()
})

