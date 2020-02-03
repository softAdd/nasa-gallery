#!/bin/sh
if [ "$1" = "dev" ]
then
echo DOCKER DEV-MODE
docker-compose --file docker-compose-dev.yml up --build
else
echo DOCKER PROD-MODE
docker-compose up --build
fi