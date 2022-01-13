#!/usr/bin/bash

apt-get update
apt-get upgrade
apt-get install nodejs
apt-get install git

git clone https://github.com/AntonioQuintanilla/whatsapp-bot.git
cd whatsapp-bot
npm i && npm start