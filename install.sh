#!/bin/bash -i
# Install dependencies
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash;
source ~/.bashrc;
nvm --version;
nvm install 16; # or install the latest version with `nvm install node`
nvm use 16;
node --version;
npm install --global yarn
npm i -g pm2
cd ./frontend && yarn install && yarn build;
cd ../backend && yarn install;
pm2 start "node --es-module-specifier-resolution=node src/index.js"
