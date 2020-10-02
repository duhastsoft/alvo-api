#!/bin/bash
cd /tmp/

curl --silent --location https://rpm.nodesource.com/setup_12.x | bash -
yum install -y gcc-c++ make
yum install -y nodejs npm

npm install -g pm2
npm install