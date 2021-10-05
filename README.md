# kmom02-backend

This is a REST API application created with Node and Express. It provides CRUD operations for a MongoDB run either locally or using the MongoDB Atlas cloud service.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode at [http://localhost:1337].<br/>
 
### `npm run production`

Runs the app in production mode.

## REST API

### GET /

A welcome message.

Response:

	{"data":{"msg":"Welcome to kmom02-backend API"}}

### GET /data

Reads all documents.

Response:

	{"docs":[{"_id":"615c5734b42d73670df76f5c","title":"Foundation","content":"<p>It is the <strong>first book</strong> in the Foundation Series.<p>"},{"_id":"615c5734b42d73670df76f5d","title":"Foundation and Empire","content":"<p>It is the <strong>second book</strong> in the Foundation Series.<p>"},{"_id":"615c5734b42d73670df76f5e","title":"Second Foundation","content":"<p>It is the <strong>third book</strong> in the Foundation Series.<p>"}]}

### GET /data/title

Reads a document with given title.

Body:

	{title: "Foundation"}

Response:

	{"doc":{"_id":"615c5734b42d73670df76f5c","title":"Foundation","content":"<p>It is the <strong>first book</strong> in the Foundation Series.<p>"}}

### POST /data

Creates a new document. 

Body:

	{title: "Prelude to Foundation", "content":"One of the two prequels."}

Response:

	{"data":{"acknowledged":true,"insertedId":"615c5836b42d73670df76f5f"}}

### PUT /data/title

Updates document with given title.

Body:

	{title: "Fundation", "content":"A science fiction novel by American writer Isaac Asimov."}

Response:

	{"data":{"lastErrorObject":{"n":1,"updatedExisting":true},"value":{"_id":"615c5734b42d73670df76f5c","title":"Foundation","content":"A science fiction novel by American writer Isaac Asimov."},"ok":1,"$clusterTime":{"clusterTime":{"$timestamp":"7015582250540466178"},"signature":{"hash":"y/fIN4xmO/dFaFO0iq2nyuFCWYw=","keyId":{"low":1,"high":1622390721,"unsigned":false}}},"operationTime":{"$timestamp":"7015582250540466178"}}}

### DELETE /data/title

Deletes document with given title.

Response:

	[]

### POST /data/reset

Restores database to default values.

Response:

	{"data":{"acknowledged":true,"insertedCount":3,"insertedIds":{"0":"615c5734b42d73670df76f5c","1":"615c5734b42d73670df76f5d","2":"615c5734b42d73670df76f5e"}}}


