#!/bin/sh
ng serve &

cd  ./server/

go run *.go &

wait
