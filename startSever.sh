#!/bin/bash

echo -e 'Server started'
PORT=4227 DATABASE_URL=postgres://matt@localhost/evernode AWS_BUCKET=mattevernode-test nodemon server/index.js
