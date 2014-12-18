#!/bin/bash

echo -e 'Server started'
PORT=9001 DATABASE_URL=postgres://matt@localhost/evernode_test AWS_BUCKET=mattevernote-test nodemon server/index.js
