const get_local_ip = require('./get_local_ip');

const port = 4858;

module.exports = {
    host: get_local_ip(),
    port
}