#!/bin/bash
cd /home/linux/
isExistApp=$(pgrep httpd)
if [[ -n  $isExistApp ]]; then
    service httpd stop
fi
yum remove -y httpd
export PM2_HOME=/home/linux/.pm2 
pm2 delete all

pm2 start server.js