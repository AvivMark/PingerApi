const ping = require('ping');
const exec = require('child_process').exec;

const oneHostStatus = (host) => {
    ping.promise.probe(host)
        .then((res) => {
            return res
        })
}

const manyHostStatus = (hosts) => {
    for (let host of hosts) {
    }
}

module.exports = {
    oneHostStatus,
    manyHostStatus
}
