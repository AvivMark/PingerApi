const ping = require('ping');



const oneHostStatus = (host) => {
    ping.promise.probe(host)
        .then((res) => {
            return res
        })
}

const manyHostStatus = (hosts) => {
    for (let host of hosts) {
        let res = await ping.promise.probe(host);
        console.log(res);
    }
}

module.exports = {
    oneHostStatus,
    manyHostStatus
}
