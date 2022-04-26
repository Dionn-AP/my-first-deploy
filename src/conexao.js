const knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'ec2-52-86-56-90.compute-1.amazonaws.com',
        user: 'xcvkixvypcdpay',
        password: '78afe089aa5127e07ecb342bd81c918e7015ef51d25806864029a738a530d64f',
        database: 'dco5u9epnqtl1t',
        port: 5432,
        ssl: {
            rejectUnauthorized: false
        }
    }
});

module.exports = knex;