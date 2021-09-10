# kmom02-backend

This is a REST API application created with Node and Express. It provides CRUD operations for a MongoDB run either locally or using the MongoDB Atlas cloud service.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode at [http://localhost:1337].<br/>
 
### `npm run start-dev`

Runs the app in development mode using nodemon (https://nodemon.io/).

### `npm run production`

Runs the app in production mode.

## REST API

### GET /

Response:

	{"data": {"msg":"Welcome to kmom02-backend API"}}

### GET /data

Response:

	[{"_id":"613a07edbebae4d608d92317","name":"Kmom01","content":"Frontend"},{"_id":"613a07edbebae4d608d92318","name":"Kmom02","content":"Backend"},{"_id":"613a07edbebae4d608d92319","name":"Kmom03","content":"Test"}]

### GET /data/name

ex: GET /data/Kmom01

Response:

	{"_id":"613a07edbebae4d608d92317","name":"Kmom01","content":"Frontend"}

### POST /data/name/content

ex.  POST /data/Kmom04/Sockets

Response:

	{"acknowledged":true,"insertedId":"613a08b7dee6531354c0ac90"}

### PUT /data/name/content

ex. PUT /data/Kmom04/Auth

Response:

	[]

### DELETE /data/name

ex. DELETE /data/Kmom04

Response:

	[]

### POST /data/reset

Restores database to default values.

Response:

	{"data":{"acknowledged":true,"insertedCount":3,"insertedIds":{"0":"613b4e8dad5e1e399ff04965","1":"613b4e8dad5e1e399ff04966","2":"613b4e8dad5e1e399ff04967"}}}


