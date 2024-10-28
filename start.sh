#!/bin/bash
set -e

# Paths are relative to the script location
cd "$(dirname "$0")"

if [[ "$1" == "1" ]]; then
  echo "Starting the SSH tunnels..."
  SSHUSER="$USER"
  if [[ "$USER" == "aragot" ]]; then
    PORT1=4010
    PORT2=4011
    PORT3=4012
  elif [[ "$USER" == "corentin" ]]; then
    PORT1=4020
    PORT2=4021
    PORT3=4022
    SSHUSER="cbriand"
  elif [[ "$USER" == "jbrilhante" ]]; then
    PORT1=4013
    PORT2=4014
    PORT3=4015
  elif [[ "$USER" == "mdiallo" ]]; then
    PORT1=4016
    PORT2=4017
    PORT3=4023
  elif [[ "$USER" == "jrancati" ]]; then
    PORT1=4018
    PORT2=4019
    PORT3=4024
  elif [[ "$USER" == "rbarlo" ]]; then
    PORT1=4025
    PORT2=4026
    PORT3=4027
  elif [[ "$USER" == "gmonrolin" ]]; then
    PORT1=4028
    PORT2=4029
    PORT3=4030
  elif [[ "$USER" == "egruau" ]]; then
    PORT1=4031
    PORT2=4032
    PORT3=4033
  else
    echo "The SSH tunnels couldn't be started."
    echo "Please update the script to support '$USER'."
    exit 1
  fi
  echo "Confluence app: https://https$PORT1.websites.requirementyogi.com"
  echo "Jira app: https://https$PORT2.websites.requirementyogi.com"
  echo "Confluence DevTools app: https://https$PORT3.websites.requirementyogi.com"
  ssh "$SSHUSER@websites.requirementyogi.com" -R $PORT1:localhost:4000 -R $PORT2:localhost:4001 -R $PORT3:localhost:4002 -o ConnectTimeout=10 "echo Connected.; read -n 1" || true
  echo "The SSH tunnels were closed."
  echo "If the connection was unsuccessful, please check the firewall on Digital Ocean:"
  echo "https://cloud.digitalocean.com/networking/firewalls/230493cb-0809-4722-90f8-906a6df69017/rules?i=1130c2"
  echo
elif [[ "$1" == "2" ]]; then
  echo "Starting the development stack..."
  docker-compose -f docker-compose.dev.yml up
elif [[ "$1" == "3" ]]; then
  echo "Starting the frontend Confluence app..."
  cd ./frontend
  npm run start:confluence-app
elif [[ "$1" == "4" ]]; then
  echo "Starting the frontend Jira app..."
  cd ./frontend
  npm run start:jira-app
elif [[ "$1" == "5" ]]; then
  echo "Starting the frontend Confluence DevTools app..."
  cd ./frontend
  npm run start:confluence-devtools-app
else
  echo
  echo "Usage:"
  echo "  ./start.sh 1 # SSH tunnels"
  echo "  ./start.sh 2 # Development stack"
  echo "  ./start.sh 3 # Frontend - Confluence app"
  echo "  ./start.sh 4 # Frontend - Jira app"
  echo "  ./start.sh 5 # Frontend - Confluence DevTools app"
  echo
fi
