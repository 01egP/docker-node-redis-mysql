const express = require('express');
const mysql = require('mysql');
const app = express();
const axios = require('axios')
const redis = require('redis')
const PORT = process.env.PORT || 9000
const REDIS_PORT = process.env.REDIS_PORT || 6379
const REDIS_HOST = process.env.REDIS_HOST || '127.0.0.1'
const client = redis.createClient({ host:REDIS_HOST, port: REDIS_PORT })

client.on('connect', () => console.log(`Redis is connected on port ${REDIS_PORT}`))
client.on("error", (error) => console.error(error))


const connection = mysql.createPool({
	connectionLimit: 10,
	host: process.env.MYSQL_HOST || 'localhost',
	user: process.env.MYSQL_USER || 'root',
	password: process.env.MYSQL_PASSWORD || 'password',
	database: process.env.MYSQL_DATABASE || 'test'
});

app.get('/', (req, res) => {
	connection.query('SELECT * FROM User' , (err, rows) => {
		if(err){
			res.json({
				success: false,
				err
				});
		}
		else{
			res.json({
				success: true,
				rows
				});
		}
	});
});

app.get('/api/v1/users/:username', (req, res) => {
	try {
	  const username = req.params.username
	  client.get(username, async (err, cache_data) => {
		if (cache_data) {
		  return res.status(200).send({
			message: `Retrieved ${username}'s data from the cache`,
			users: JSON.parse(cache_data)
		  })
		} else {
		  const api = await axios.get(`https://jsonplaceholder.typicode.com/users/?username=${username}`)
		  client.setex(username, 1440, JSON.stringify(api.data))
		  return res.status(200).send({
			message: `Retrieved ${username}'s data from the server`,
			users: api.data
		  })
		}
	  })
	} catch (error) {
	  console.log(error)
	}
  })

app.listen(5000, () => console.log('listining on port 5003'));
