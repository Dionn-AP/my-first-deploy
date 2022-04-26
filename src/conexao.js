const knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'ec2-54-80-122-11.compute-1.amazonaws.com',
        user: 'ovzgripvfzdtag',
        password: '8726baf21dd7e247c932cf3266310951bdf6e4b728627767c58903e9204654c0',
        database: 'd41gtar2e12u8a',
        port: 5432,
        ssl: {
            rejectUnauthorized: false
        }
    }
});

module.exports = knex;